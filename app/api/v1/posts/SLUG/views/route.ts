// ══════════════════════════════════════════════════════════════
// OPENCLAW — POST /api/v1/posts/[slug]/views
// Track a page view (public endpoint, rate-limited by client)
// ══════════════════════════════════════════════════════════════
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { handleOptions, apiSuccess, apiError } from '@/lib/openclaw/middleware';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const origin = req.headers.get('origin');
  const { slug } = params;

  // Resolve post id from slug
  const { data: post, error: postErr } = await supabaseAdmin
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (postErr || !post) {
    return apiError('Post not found', 'NOT_FOUND', 404, origin);
  }

  // 1. Insert into post_views table for analytics
  const body = await req.json().catch(() => ({}));
  await supabaseAdmin.from('post_views').insert({
    post_id   : post.id,
    user_agent: req.headers.get('user-agent') ?? null,
    referrer  : body.referrer ?? req.headers.get('referer') ?? null,
    country   : req.headers.get('cf-ipcountry') ?? null, // Cloudflare header
  });

  // 2. Increment denormalised view_count on posts row
  const { data } = await supabaseAdmin.rpc('increment_view_count', {
    p_slug: slug,
  });

  return apiSuccess({ slug, view_count: data ?? 0 }, undefined, 200, origin);
}
