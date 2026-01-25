import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // Veritabanına çok küçük bir sorgu atıyoruz (Örn: Bir tablodan 1 satır çekmek)
  // Bu işlem Supabase'i aktif tutacaktır.
  const { data, error } = await supabase.from("urls").select("id").limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Supabase is awake!", data });
}
