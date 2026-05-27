// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fetch posts based on active locale — replacing hardcoded content
export async function getPosts(locale: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, published_at, tags')
    .eq('locale', locale)
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
  return data
}