// ══════════════════════════════════════════════════════════════
// OPENCLAW — GET /api/v1/media · POST /api/v1/media
// List media assets · Upload file to Supabase Storage
// ══════════════════════════════════════════════════════════════
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  handleOptions,
  requireAdminKey,
  apiSuccess,
  apiError,
  parsePagination,
} from '@/lib/openclaw/middleware';
import type { MediaType } from '@/lib/openclaw/types';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

// ── GET /api/v1/media ─────────────────────────────────────────
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const url    = new URL(req.url);
  const { offset, limit, page } = parsePagination(req);

  const type    = url.searchParams.get('type')    as MediaType | null;
  const post_id = url.searchParams.get('post_id');

  let query = supabaseAdmin
    .from('media')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (type)    query = query.eq('type', type);
  if (post_id) query = query.eq('post_id', post_id);

  const { data, error, count } = await query.range(offset, offset + limit - 1);

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess(
    { items: data, total: count ?? 0, page, limit },
    undefined,
    200,
    origin
  );
}

// ── POST /api/v1/media (multipart upload) ─────────────────────
export async function POST(req: NextRequest) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  const contentType = req.headers.get('content-type') ?? '';

  // ── A) Multipart upload (file) ──────────────────────────────
  if (contentType.includes('multipart/form-data')) {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return apiError('Could not parse multipart form', 'BAD_REQUEST', 400, origin);
    }

    const file   = formData.get('file') as File | null;
    const postId = formData.get('post_id') as string | null;
    const altText = formData.get('alt_text') as string | null;
    const caption = formData.get('caption') as string | null;

    if (!file) {
      return apiError('No file provided in form-data (field: "file")', 'BAD_REQUEST', 400, origin);
    }

    const bucket      = 'blog-media';
    const ext         = file.name.split('.').pop() ?? 'bin';
    const safeFile    = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `uploads/${Date.now()}-${safeFile}`;

    // Upload to Supabase Storage
    const { error: storageErr } = await supabaseAdmin
      .storage
      .from(bucket)
      .upload(storagePath, file, {
        contentType : file.type,
        cacheControl: '3600',
        upsert      : false,
      });

    if (storageErr) {
      return apiError(storageErr.message, 'STORAGE_ERROR', 500, origin);
    }

    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from(bucket)
      .getPublicUrl(storagePath);

    const mediaType: MediaType = file.type.startsWith('video/')
      ? 'video'
      : file.type.startsWith('audio/')
        ? 'audio'
        : file.type === 'application/pdf'
          ? 'document'
          : 'image';

    const { data, error } = await supabaseAdmin
      .from('media')
      .insert({
        post_id        : postId   ?? null,
        file_name      : file.name,
        file_url       : publicUrl,
        storage_path   : storagePath,
        storage_bucket : bucket,
        mime_type      : file.type,
        file_size_bytes: file.size,
        alt_text       : altText ?? null,
        caption        : caption ?? null,
        type           : mediaType,
      })
      .select()
      .single();

    if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

    return apiSuccess(data, 'Media uploaded', 201, origin);
  }

  // ── B) JSON metadata record (external URL) ──────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return apiError('Invalid JSON body', 'BAD_REQUEST', 400, origin);
  }

  if (!body.file_name || !body.file_url || !body.mime_type || !body.type) {
    return apiError(
      'file_name, file_url, mime_type and type are required',
      'VALIDATION_ERROR',
      422,
      origin
    );
  }

  const { data, error } = await supabaseAdmin
    .from('media')
    .insert(body)
    .select()
    .single();

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess(data, 'Media record created', 201, origin);
}
