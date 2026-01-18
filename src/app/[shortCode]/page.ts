import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { createClient } from "@supabase/supabase-js";
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Bu anahtar RLS'i bypass eder.
);
interface RedirectPageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function RedirectPage({ params } : RedirectPageProps) {
  // 1. URL'deki kodu al (Örn: localhost:3000/aB2c8 adresindeki aB2c8 kısmı)
  const { shortCode } =await params;

  // 2. Veritabanında bu kodu ara
  const { data, error } = await supabase
    .from('urls')
    .select('original_url, clicks')
    .eq('short_code', shortCode)
    .single();

  // 3. Eğer kod yoksa ana sayfaya veya 404'e gönder
  if (error || !data) {
    redirect("/?error=not_found");
  }
 
  // 4. (Opsiyonel ama seni öne çıkaracak kısım) Tıklama sayısını +1 artır
  await supabaseAdmin
    .from('urls')
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq('short_code', shortCode);
    

  // 5. Ve asıl büyük final: Kullanıcıyı orijinal linke uçur!
  redirect(data.original_url);
}