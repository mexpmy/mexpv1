// ══════════════════════════════════════════════════════════════
// OPENCLAW — Frontend API Client (typed SDK)
// Import this anywhere in your Next.js app instead of calling
// supabase directly — keeps all data access in one layer.
// ══════════════════════════════════════════════════════════════

import type {
  Post,
  Media,
  RoadmapStep,
  PostAnalytics,
  CreatePostPayload,
  UpdatePostPayload,
  CreateMediaPayload,
  CreateRoadmapStepPayload,
  SubscribePayload,
  PostsQuery,
} from '@/lib/openclaw/types';

const BASE = '/api/v1';

// ── Utility ───────────────────────────────────────────────────

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(BASE + path, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

async function request<T>(
  url: string,
  options: RequestInit = {},
  adminKey?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };
  if (adminKey) {
    (headers as Record<string, string>)['x-api-key'] = adminKey;
  }

  const res = await fetch(url, { ...options, headers });
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error ?? `HTTP ${res.status}`);
  }

  return json.data ?? json;
}

// ══════════════════════════════════════════════════════════════
// POSTS
// ══════════════════════════════════════════════════════════════

export const Posts = {
  /** List posts (public: only published; admin: all) */
  list(query?: PostsQuery, adminKey?: string): Promise<Post[]> {
    const url = buildUrl('/posts', query as Record<string, string>);
    return request<Post[]>(url, {}, adminKey);
  },

  /** Get single post by slug */
  get(slug: string, adminKey?: string): Promise<Post> {
    return request<Post>(buildUrl(`/posts/${slug}`), {}, adminKey);
  },

  /** Create a new post (admin only) */
  create(payload: CreatePostPayload, adminKey: string): Promise<Post> {
    return request<Post>(
      buildUrl('/posts'),
      { method: 'POST', body: JSON.stringify(payload) },
      adminKey
    );
  },

  /** Update an existing post (admin only) */
  update(slug: string, payload: UpdatePostPayload, adminKey: string): Promise<Post> {
    return request<Post>(
      buildUrl(`/posts/${slug}`),
      { method: 'PUT', body: JSON.stringify(payload) },
      adminKey
    );
  },

  /** Publish a draft post (admin only) */
  publish(slug: string, adminKey: string): Promise<Post> {
    return Posts.update(slug, { status: 'published' }, adminKey);
  },

  /** Delete a post (admin only) */
  delete(slug: string, adminKey: string): Promise<{ slug: string }> {
    return request<{ slug: string }>(
      buildUrl(`/posts/${slug}`),
      { method: 'DELETE' },
      adminKey
    );
  },

  /** Track a page view (public) */
  trackView(slug: string, referrer?: string): Promise<{ view_count: number }> {
    return request(
      buildUrl(`/posts/${slug}/views`),
      { method: 'POST', body: JSON.stringify({ referrer }) }
    );
  },
};

// ══════════════════════════════════════════════════════════════
// MEDIA
// ══════════════════════════════════════════════════════════════

export const MediaLib = {
  /** List media assets */
  list(
    opts?: { type?: string; post_id?: string; page?: number; limit?: number },
    adminKey?: string
  ): Promise<{ items: Media[]; total: number }> {
    return request(buildUrl('/media', opts as Record<string, string>), {}, adminKey);
  },

  /** Upload a file (admin only) */
  upload(file: File, opts: { post_id?: string; alt_text?: string; caption?: string }, adminKey: string): Promise<Media> {
    const form = new FormData();
    form.append('file', file);
    if (opts.post_id)  form.append('post_id', opts.post_id);
    if (opts.alt_text) form.append('alt_text', opts.alt_text);
    if (opts.caption)  form.append('caption', opts.caption);

    return request<Media>(
      buildUrl('/media'),
      {
        method : 'POST',
        body   : form,
        headers: { 'x-api-key': adminKey }, // Content-Type omitted — browser sets boundary
      }
    );
  },

  /** Register an external URL as a media record (admin only) */
  register(payload: CreateMediaPayload, adminKey: string): Promise<Media> {
    return request<Media>(
      buildUrl('/media'),
      { method: 'POST', body: JSON.stringify(payload) },
      adminKey
    );
  },

  /** Get single media item */
  get(id: string): Promise<Media> {
    return request<Media>(buildUrl(`/media/${id}`));
  },

  /** Delete a media asset (admin only) */
  delete(id: string, adminKey: string): Promise<{ id: string }> {
    return request<{ id: string }>(
      buildUrl(`/media/${id}`),
      { method: 'DELETE' },
      adminKey
    );
  },
};

// ══════════════════════════════════════════════════════════════
// ROADMAP
// ══════════════════════════════════════════════════════════════

export const Roadmap = {
  list(): Promise<RoadmapStep[]> {
    return request<RoadmapStep[]>(buildUrl('/roadmap'));
  },

  get(id: string | number): Promise<RoadmapStep> {
    return request<RoadmapStep>(buildUrl(`/roadmap/${id}`));
  },

  create(payload: CreateRoadmapStepPayload, adminKey: string): Promise<RoadmapStep> {
    return request<RoadmapStep>(
      buildUrl('/roadmap'),
      { method: 'POST', body: JSON.stringify(payload) },
      adminKey
    );
  },

  update(id: string | number, payload: Partial<CreateRoadmapStepPayload>, adminKey: string): Promise<RoadmapStep> {
    return request<RoadmapStep>(
      buildUrl(`/roadmap/${id}`),
      { method: 'PUT', body: JSON.stringify(payload) },
      adminKey
    );
  },

  delete(id: string | number, adminKey: string): Promise<{ id: string }> {
    return request<{ id: string }>(
      buildUrl(`/roadmap/${id}`),
      { method: 'DELETE' },
      adminKey
    );
  },
};

// ══════════════════════════════════════════════════════════════
// SUBSCRIBERS
// ══════════════════════════════════════════════════════════════

export const Subscribers = {
  subscribe(payload: SubscribePayload): Promise<{ id: string; email: string }> {
    return request(
      buildUrl('/subscribers'),
      { method: 'POST', body: JSON.stringify(payload) }
    );
  },
};

// ══════════════════════════════════════════════════════════════
// ANALYTICS
// ══════════════════════════════════════════════════════════════

export const Analytics = {
  dashboard(adminKey: string): Promise<{
    summary     : Record<string, number>;
    top_posts   : PostAnalytics[];
    by_pillar   : Record<string, number>;
    recent_views: unknown[];
  }> {
    return request(buildUrl('/analytics'), {}, adminKey);
  },
};
