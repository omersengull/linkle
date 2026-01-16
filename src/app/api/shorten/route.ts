import { supabase } from "@/lib/supabase";
import { z } from "zod";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const urlSchema = z.string().url();
export async function POST(request: Request) {
  try {
    const { originalUrl }: { originalUrl: string } = await request.json();
    // Kullanıcıdan gelen url db'de zaten var mı diye kontrol ediyoruz
    const { data: existingEntry } = await supabase
      .from('urls')
      .select('short_code')
      .eq('original_url', originalUrl)
      .single();
    if (existingEntry) {
      return NextResponse.json({ shortCode: existingEntry.short_code });
    }

    if (!urlSchema.safeParse(originalUrl).success) {
      return NextResponse.json(
        { error: "Geçersiz bir URL girdiniz" },
        { status: 400 },
      );
    }
    // 1. 6 haneli rastgele kod üret (Örn: aB2c8X)
    const shortCode = nanoid(6);

    // 2. PostgreSQL'e kaydet
    const { data, error } = await supabase
      .from("urls") // SQL'de oluşturduğun tablonun adı
      .insert([{ original_url: originalUrl, short_code: shortCode }])
      .select()
      .single();
    if (error) throw error;
    

    // 3. Kullanıcıya kısa kodu geri gönder
    return NextResponse.json({ shortCode: data[0].short_code });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
