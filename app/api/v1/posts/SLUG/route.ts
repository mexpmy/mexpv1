// ══════════════════════════════════════════════════════════════
// OPENCLAW — /api/v1/posts/[slug]
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
import type { UpdatePostPayload } from '@/lib/openclaw/types';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

// ── GET /api/v1/posts/[slug] ──────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const origin = req.headers.get('origin');
  const { slug } = params;

  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*, media(id,file_url,file_name,type,alt_text,is_featured)')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return apiError('Post not found', 'NOT_FOUND', 404, origin);
  }

  // Public can only read published posts
  const isAdmin = !!(
    req.headers.get('authorization') ||
    req.headers.get('x-api-key')
  );
  if (!isAdmin && data.status !== 'published') {
    return apiError('Post not found', 'NOT_FOUND', 404, origin);
  }

  return apiSuccess(data, undefined, 200, origin);
}

// ── PUT /api/v1/posts/[slug] ──────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const origin = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  const { slug } = params;
  let body: UpdatePostPayload;
  try {
    body = await req.json();
  } catch {
    return apiError('Invalid JSON body', 'BAD_REQUEST', 400, origin);
  }

  // If publishing for the first time, set published_at
  const updates: Record<string, unknown> = { ...body };
  if (body.status === 'published') {
    updates.published    = true;
    updates.published_at = body.published_at ?? new Date().toISOString();
  } else if (body.status === 'draft' || body.status === 'archived') {
    updates.published = false;
  }

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single();

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);
  if (!data)  return apiError('Post not found', 'NOT_FOUND', 404, origin);

  return apiSuccess(data, 'Post updated', 200, origin);
}

// ── DELETE /api/v1/posts/[slug] ───────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const origin = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  const { slug } = params;

  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('slug', slug);

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess({ slug }, 'Post deleted', 200, origin);
}
