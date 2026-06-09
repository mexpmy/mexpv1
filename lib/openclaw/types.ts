// ══════════════════════════════════════════════════════════════
// OPENCLAW BLOG API — Shared TypeScript Types
// mymexp.com · Syahmi Saadon
// ══════════════════════════════════════════════════════════════

export type Pillar =
  | 'business'
  | 'engineering'
  | 'ai-ml'
  | 'oil-gas'
  | 'data-centers';

export type PostStatus = 'draft' | 'published' | 'archived';
export type MediaType = 'image' | 'video' | 'document' | 'audio';
export type SubscriberStatus = 'active' | 'unsubscribed' | 'bounced';
export type RoadmapStatus = 'planned' | 'in-progress' | 'completed';

// ── Database Row Types ────────────────────────────────────────

export interface Post {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  description: string | null;
  content: string | null;
  status: PostStatus;
  pillar: Pillar;
  tags: string[] | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  reading_time_minutes: number;
  view_count: number;
  seo_title: string | null;
  seo_description: string | null;
  author_name: string;
  author_email: string;
  published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  post_id: string | null;
  file_name: string;
  file_url: string;
  storage_path: string | null;
  storage_bucket: string;
  mime_type: string;
  file_size_bytes: number;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  alt_text: string | null;
  caption: string | null;
  type: MediaType;
  is_featured: boolean;
  created_at: string;
}

export interface RoadmapStep {
  id: number;
  step_number: number;
  title: string;
  icon: string;
  problem: string | null;
  solution: string | null;
  code_implementation: string | null;
  status: RoadmapStatus;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: SubscriberStatus;
  source: string;
  pillar_preferences: Pillar[];
  created_at: string;
  unsubscribed_at: string | null;
}

export interface PostAnalytics {
  id: string;
  slug: string;
  title: string;
  pillar: Pillar;
  status: PostStatus;
  view_count: number;
  published_at: string | null;
  session_views: number;
  views_last_7d: number;
  views_last_30d: number;
}

// ── API Request / Response types ──────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ApiError {
  error: string;
  code: string;
  status: number;
}

export interface ApiSuccess<T = unknown> {
  data: T;
  message?: string;
}

// ── Post request payloads ─────────────────────────────────────

export interface CreatePostPayload {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string;
  content?: string;
  pillar?: Pillar;
  status?: PostStatus;
  tags?: string[];
  featured_image_url?: string;
  featured_image_alt?: string;
  reading_time_minutes?: number;
  seo_title?: string;
  seo_description?: string;
  locale?: string;
  published_at?: string;
}

export interface UpdatePostPayload extends Partial<CreatePostPayload> {}

export interface CreateMediaPayload {
  post_id?: string;
  file_name: string;
  file_url: string;
  storage_path?: string;
  storage_bucket?: string;
  mime_type: string;
  file_size_bytes?: number;
  width?: number;
  height?: number;
  duration_seconds?: number;
  alt_text?: string;
  caption?: string;
  type: MediaType;
  is_featured?: boolean;
}

export interface CreateRoadmapStepPayload {
  step_number: number;
  title: string;
  icon?: string;
  problem?: string;
  solution?: string;
  code_implementation?: string;
  status?: RoadmapStatus;
  priority?: number;
}

export interface SubscribePayload {
  email: string;
  name?: string;
  source?: string;
  pillar_preferences?: Pillar[];
}

// ── Query param types ─────────────────────────────────────────

export interface PostsQuery {
  page?: number;
  limit?: number;
  pillar?: Pillar;
  status?: PostStatus;
  tag?: string;
  locale?: string;
  search?: string;
  order?: 'created_at' | 'published_at' | 'view_count';
  direction?: 'asc' | 'desc';
}
