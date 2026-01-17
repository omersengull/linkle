import { supabase, supabaseAdmin } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// authOptions'ı import ettiğinden emin ol (yolu projene göre ayarla)
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // ÖNEMLİ: getServerSession'a authOptions'ı geçmelisin
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { codes }: { codes: string[] } = await request.json();
    console.log("Eşitlenecek kodlar:", codes); // Terminalden kontrol etmek için
    console.log("Kullanıcı ID:", session.user.id);

    if (!codes || codes.length === 0) {
      return NextResponse.json({ message: "Eşitlenecek link bulunamadı" });
    }

    const { data, error } = await supabaseAdmin
      .from("urls")
      .update({ user_id: session.user.id })
      .in("short_code", codes)
      .is("user_id", null)
      .select();
    console.log("Supabase Yanıtı (Data):", data);
    if (error) console.error("Güncelleme Hatası:", error);

    return NextResponse.json({
      message: "Başarıyla senkronize edildi",
      count: (data as any[])?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
