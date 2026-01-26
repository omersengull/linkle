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

  const { shortCode } =await params;


  const { data, error } = await supabase
    .from('urls')
    .select('original_url, clicks')
    .eq('short_code', shortCode)
    .single();


  if (error || !data) {
    redirect("/?error=not_found");
  }
 
  await supabaseAdmin
    .from('urls')
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq('short_code', shortCode);

  redirect(data.original_url);
}