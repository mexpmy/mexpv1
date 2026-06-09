// ══════════════════════════════════════════════════════════════
// OPENCLAW — /api/v1/roadmap  (GET list · POST create)
//            /api/v1/roadmap/[id] (GET · PUT · DELETE)
// ══════════════════════════════════════════════════════════════

// ── roadmap/route.ts ──────────────────────────────────────────
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  handleOptions,
  requireAdminKey,
  apiSuccess,
  apiError,
} from '@/lib/openclaw/middleware';
import type { CreateRoadmapStepPayload } from '@/lib/openclaw/types';

export const runtime = 'edge';

export function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');

  const { data, error } = await supabaseAdmin
    .from('roadmap_steps')
    .select('*')
    .order('step_number', { ascending: true });

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess(data, undefined, 200, origin);
}

export async function POST(req: NextRequest) {
  const origin  = req.headers.get('origin');
  const authErr = requireAdminKey(req);
  if (authErr) return authErr;

  let body: CreateRoadmapStepPayload;
  try {
    body = await req.json();
  } catch {
    return apiError('Invalid JSON body', 'BAD_REQUEST', 400, origin);
  }

  if (!body.step_number || !body.title) {
    return apiError('step_number and title are required', 'VALIDATION_ERROR', 422, origin);
  }

  const { data, error } = await supabaseAdmin
    .from('roadmap_steps')
    .insert({
      step_number          : body.step_number,
      title                : body.title,
      icon                 : body.icon                  ?? '🔧',
      problem              : body.problem,
      solution             : body.solution,
      code_implementation  : body.code_implementation,
      status               : body.status                ?? 'planned',
      priority             : body.priority              ?? 0,
    })
    .select()
    .single();

  if (error) return apiError(error.message, 'DB_ERROR', 500, origin);

  return apiSuccess(data, 'Roadmap step created', 201, origin);
}
