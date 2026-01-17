import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('Supabase çevre değişkenleri eksik! .env.local dosyasını kontrol edin.')
}

// 1. Standart İstemci: İstemci tarafında (Client Component) ve genel işlerde kullanılır.
// RLS (Row Level Security) kurallarına tabidir.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Admin İstemci: SADECE sunucu tarafında (Server Actions, API Routes) kullanılır.
// RLS kurallarını atlar. Senkronizasyon (sync) gibi kritik işlemler için bunu kullanacağız.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);