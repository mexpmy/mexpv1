// ══════════════════════════════════════════════════════════════
// OPENCLAW — Supabase Admin Client (service role)
// Use only in server-side API routes — never expose to client
// ══════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error(
    '[OpenClaw] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars'
  );
}

/**
 * Admin Supabase client — bypasses RLS.
 * Only use in Next.js API route handlers (server-side).
 */
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
