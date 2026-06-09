// ══════════════════════════════════════════════════════════════
// OPENCLAW — GET /api/v1/media/[id] · DELETE /api/v1/media/[id]
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

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin = req.headers.get('origin');

  const { data, error } = await supabaseAdmin
    .from('media')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return apiError('Media not found', 'NOT_FOUND', 404, origin);
  }

  return apiSuccess(data, undefined, 200, origin);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  // Fetch storage_path so we can remove from bucket
  const { data: media } = await supabaseAdmin
    .from('media')
    .select('storage_path, storage_bucket')
    .eq('id', params.id)
    .single();

  if (media?.storage_path && media?.storage_bucket) {
    await supabaseAdmin
      .storage
      .from(media.storage_bucket)
      .remove([media.storage_path]);
  }

  const { error } = await supabaseAdmin
    .from('media')
    .delete()
    .eq('id', params.id);

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess({ id: params.id }, 'Media deleted', 200, origin);
}
