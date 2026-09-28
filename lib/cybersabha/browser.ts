'use client';

import { createClient } from '@supabase/supabase-js';

let browserClient: ReturnType<typeof createClient> | undefined;

export function getCyberSabhaAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase public configuration is missing.');
  browserClient ??= createClient(url, key);
  return browserClient;
}