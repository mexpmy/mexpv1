// ══════════════════════════════════════════════════════════════
// OPENCLAW — Supabase Admin Client (service role)
// Use only in server-side API routes — never expose to client
// ══════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.warn(
    '[OpenClaw] Supabase admin env is missing. API routes requiring the database will be unavailable until .env.local is configured.'
  );
}

/**
 * Admin Supabase client — bypasses RLS.
 * Only use in Next.js API route handlers (server-side).
 */
export const supabaseAdmin = createClient(
  SUPABASE_URL || 'https://missing-supabase-project.invalid',
  SERVICE_ROLE_KEY || 'missing-service-role-key',
  {
  auth: { persistSession: false },
  }
);
