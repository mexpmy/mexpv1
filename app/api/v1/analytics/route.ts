// ══════════════════════════════════════════════════════════════
// OPENCLAW — GET /api/v1/analytics
// Admin-only: posts + views + subscriber stats
// ══════════════════════════════════════════════════════════════
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
  handleOptions,
  requireAdminKey,
  apiSuccess,
  apiError,
} from '@/lib/openclaw/middleware';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) { return handleOptions(req); }

export async function GET(req: NextRequest) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  const [
    { data: topPosts },
    { data: pillarStats },
    { count: totalPosts },
    { count: publishedPosts },
    { count: totalSubscribers },
    { count: totalViews },
    { count: viewsThisWeek },
    { data: recentViews },
  ] = await Promise.all([
    // Top 10 posts by view count
    supabaseAdmin
      .from('posts_analytics')
      .select('slug,title,pillar,view_count,views_last_7d,views_last_30d')
      .order('view_count', { ascending: false })
      .limit(10),

    // Breakdown by pillar
    supabaseAdmin
      .from('posts')
      .select('pillar')
      .eq('status', 'published'),

    supabaseAdmin.from('posts').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabaseAdmin.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabaseAdmin.from('post_views').select('*', { count: 'exact', head: true }),

    // Views in the last 7 days
    supabaseAdmin
      .from('post_views')
      .select('*', { count: 'exact', head: true })
      .gte('viewed_at', new Date(Date.now() - 7 * 86400_000).toISOString()),

    // Last 20 views for live feed
    supabaseAdmin
      .from('post_views')
      .select('id, post_id, country, referrer, viewed_at, posts(slug,title)')
      .order('viewed_at', { ascending: false })
      .limit(20),
  ]);

  // Aggregate by pillar
  const byPillar = (pillarStats ?? []).reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.pillar] = (acc[row.pillar] ?? 0) + 1;
      return acc;
    },
    {}
  );

  return apiSuccess(
    {
      summary: {
        total_posts       : totalPosts      ?? 0,
        published_posts   : publishedPosts  ?? 0,
        total_views       : totalViews      ?? 0,
        views_last_7d     : viewsThisWeek   ?? 0,
        total_subscribers : totalSubscribers ?? 0,
      },
      top_posts   : topPosts   ?? [],
      by_pillar   : byPillar,
      recent_views: recentViews ?? [],
    },
    undefined,
    200,
    origin
  );
}
