import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    // Oturum yoksa işlem yapma
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { codes }: { codes: string[] } = await request.json();

    if (!codes || codes.length === 0) {
      return NextResponse.json({ message: "Eşitlenecek link bulunamadı" });
    }

    // user_id'si NULL olan ve listede bulunan kodları güncelle
    const { data, error } = await supabase
      .from("urls")
      .update({ user_id: session.user.id })
      .in("short_code", codes)
      .is("user_id", null) // Güvenlik: Sadece sahipsiz linkleri al
      .select();

    if (error) throw error;

    return NextResponse.json({ 
      message: "Linkler başarıyla hesabınıza aktarıldı", 
      count: data?.length 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}