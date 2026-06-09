// ══════════════════════════════════════════════════════════════
// OPENCLAW — /api/v1/roadmap/[id]
// GET · PUT · DELETE
// ══════════════════════════════════════════════════════════════
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  handleOptions,
  requireAdminKey,
  apiSuccess,
  apiError,
} from '@/lib/openclaw/middleware';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) { return handleOptions(req); }

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = req.headers.get('origin');
  const { data, error } = await supabaseAdmin
    .from('roadmap_steps')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) return apiError('Step not found', 'NOT_FOUND', 404, origin);
  return apiSuccess(data, undefined, 200, origin);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return apiError('Invalid JSON', 'BAD_REQUEST', 400, origin); }

  const { data, error } = await supabaseAdmin
    .from('roadmap_steps')
    .update(body)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);
  if (!data)  return apiError('Step not found', 'NOT_FOUND', 404, origin);

  return apiSuccess(data, 'Step updated', 200, origin);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  const { error } = await supabaseAdmin
    .from('roadmap_steps')
    .delete()
    .eq('id', params.id);

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);
  return apiSuccess({ id: params.id }, 'Step deleted', 200, origin);
}
