import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export async function getUserLinks(userId: string) {
  noStore();
  const { data, error } = await supabaseAdmin
    .from("urls")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Linkler çekilirken hata:", error);
    return [];
  }
  return data;
}