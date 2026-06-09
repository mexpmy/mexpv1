// ══════════════════════════════════════════════════════════════
// OPENCLAW — API Middleware
// Auth · CORS · Error helpers · Rate-limit hints
// ══════════════════════════════════════════════════════════════
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://mymexp.com',
  'https://www.mymexp.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
];

// ── CORS headers ──────────────────────────────────────────────
export function corsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin'  : allowedOrigin,
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers' : 'Content-Type, Authorization, x-api-key',
    'Access-Control-Max-Age'       : '86400',
  };
}

export function handleOptions(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

// ── Auth guard: require service-role key or OPENCLAW_API_KEY ──
export function requireAdminKey(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get('authorization') ?? '';
  const apiKeyHeader = req.headers.get('x-api-key') ?? '';

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : apiKeyHeader;

  const validKeys = [
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.OPENCLAW_API_KEY,
  ].filter(Boolean);

  if (!validKeys.includes(token)) {
    return apiError('Unauthorized — valid admin key required', 'UNAUTHORIZED', 401);
  }
  return null; // pass
}

// ── Standardised JSON helpers ─────────────────────────────────
export function apiSuccess<T>(
  data: T,
  message?: string,
  status = 200,
  origin?: string | null
): NextResponse {
  return NextResponse.json(
    { data, ...(message ? { message } : {}) },
    { status, headers: corsHeaders(origin ?? null) }
  );
}

export function apiError(
  error: string,
  code = 'INTERNAL_ERROR',
  status = 500,
  origin?: string | null
): NextResponse {
  return NextResponse.json(
    { error, code, status },
    { status, headers: corsHeaders(origin ?? null) }
  );
}

// ── Pagination helper ─────────────────────────────────────────
export function parsePagination(req: NextRequest) {
  const url    = new URL(req.url);
  const page   = Math.max(1, parseInt(url.searchParams.get('page')  ?? '1',  10));
  const limit  = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') ?? '10', 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function paginationMeta(
  page: number,
  limit: number,
  total: number
) {
  const total_pages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    total_pages,
    has_next: page < total_pages,
    has_prev: page > 1,
  };
}
