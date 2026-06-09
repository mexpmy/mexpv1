// ══════════════════════════════════════════════════════════════
// OPENCLAW — GET /api/v1/posts · POST /api/v1/posts
// ══════════════════════════════════════════════════════════════
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  corsHeaders,
  handleOptions,
  requireAdminKey,
  apiSuccess,
  apiError,
  parsePagination,
  paginationMeta,
} from '@/lib/openclaw/middleware';
import type { CreatePostPayload, Pillar, PostStatus } from '@/lib/openclaw/types';

export const runtime = 'edge';

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

// ── GET /api/v1/posts ─────────────────────────────────────────
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const url    = new URL(req.url);

  const { page, limit, offset } = parsePagination(req);
  const pillar   = url.searchParams.get('pillar')    as Pillar | null;
  const status   = url.searchParams.get('status')    as PostStatus | null;
  const tag      = url.searchParams.get('tag');
  const locale   = url.searchParams.get('locale');
  const search   = url.searchParams.get('search');
  const order    = url.searchParams.get('order')     ?? 'published_at';
  const dir      = url.searchParams.get('direction') ?? 'desc';

  try {
    let query = supabaseAdmin
      .from('posts')
      .select(
        'id,slug,locale,title,excerpt,description,pillar,status,tags,' +
        'featured_image_url,featured_image_alt,reading_time_minutes,' +
        'view_count,author_name,published_at,created_at',
        { count: 'exact' }
      );

    // Public (no admin key) → only published posts
    const isAdmin = !!(
      req.headers.get('authorization') ||
      req.headers.get('x-api-key')
    );
    if (!isAdmin) {
      query = query.eq('status', 'published');
    } else if (status) {
      query = query.eq('status', status);
    }

    if (pillar)  query = query.eq('pillar', pillar);
    if (locale)  query = query.eq('locale', locale);
    if (tag)     query = query.contains('tags', [tag]);
    if (search)  query = query.ilike('title', `%${search}%`);

    const validOrders = ['created_at', 'published_at', 'view_count'];
    const safeOrder   = validOrders.includes(order) ? order : 'published_at';
    const ascending   = dir === 'asc';

    const { data, error, count } = await query
      .order(safeOrder, { ascending, nullsFirst: false })
      .range(offset, offset + limit - 1);

    if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

    return apiSuccess(
      data,
      undefined,
      200,
      origin
    );

  } catch (err) {
    return apiError('Internal server error', 'INTERNAL_ERROR', 500, origin);
  }
}

// ── POST /api/v1/posts ────────────────────────────────────────
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');

  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  let body: CreatePostPayload;
  try {
    body = await req.json();
  } catch {
    return apiError('Invalid JSON body', 'BAD_REQUEST', 400, origin);
  }

  const { title, slug } = body;
  if (!title || !slug) {
    return apiError('title and slug are required', 'VALIDATION_ERROR', 422, origin);
  }

  // Slugify and validate
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

  const { data, error } = await supabaseAdmin
    .from('posts')
    .insert({
      title,
      slug: safeSlug,
      locale            : body.locale              ?? 'en',
      excerpt           : body.excerpt,
      description       : body.description,
      content           : body.content,
      pillar            : body.pillar              ?? 'engineering',
      status            : body.status              ?? 'draft',
      tags              : body.tags                ?? [],
      featured_image_url: body.featured_image_url,
      featured_image_alt: body.featured_image_alt,
      reading_time_minutes: body.reading_time_minutes ?? 5,
      seo_title         : body.seo_title,
      seo_description   : body.seo_description,
      published         : body.status === 'published',
      published_at      : body.status === 'published'
        ? (body.published_at ?? new Date().toISOString())
        : body.published_at ?? null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return apiError('Slug already exists', 'DUPLICATE_SLUG', 409, origin);
    }
    return apiError(error.message, 'DB_ERROR', 500, origin);
  }

  return apiSuccess(data, 'Post created', 201, origin);
}
