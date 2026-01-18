import { supabase } from "@/lib/supabase";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import normalizeUrl from "normalize-url";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { authOptions } from "../auth/[...nextauth]/route";
// Saniyede 1000 istek gelmesini engellemek için Redis tabanlı kısıtlayıcı
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 60 saniyede en fazla 5 istek
  analytics: true,
});
const urlSchema = z.string().url();
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          }
        }
      );
    }
    const { originalUrl }: { originalUrl: string } = await request.json();
    const normalized = normalizeUrl(originalUrl, {
      stripWWW: true, // İsteğe bağlı: www kalsın mı silinsin mi?
      removeTrailingSlash: true, // Sondaki '/' işaretini kaldırır
      forceHttps: true, // http girilse bile https olarak kaydeder
    });
    

    if (!urlSchema.safeParse(normalized).success) {
      return NextResponse.json(
        { error: "Geçersiz bir URL girdiniz" },
        { status: 400 },
      );
    }
    // 1. 6 haneli rastgele kod üret (Örn: aB2c8X)
    const shortCode = nanoid(7);

    // 2. PostgreSQL'e kaydet
    const { data, error } = await supabaseAdmin
      .from("urls") // SQL'de oluşturduğun tablonun adı
      .insert([{ original_url: normalized, short_code: shortCode, user_id:session?.user?.id || null}])
      .select()
      .single();
    if (error) throw error;
    revalidatePath("/");

    // 3. Kullanıcıya kısa kodu geri gönder
    return NextResponse.json({ shortCode: data.short_code });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}