"use client";

import { createBrowserClient } from '@supabase/ssr'

export const createSupbaseBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
  
  return supabase
}
