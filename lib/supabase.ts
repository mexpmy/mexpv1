// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isDev = process.env.NODE_ENV === 'development';

// Graceful handling when Supabase is not configured (common during local development)
let supabase: ReturnType<typeof createClient>;

if (!supabaseUrl || !supabaseAnonKey) {
  if (isDev) {
    console.warn(
      "⚠️  Supabase not configured. Blog & Roadmap pages will show fallback content.\n" +
      "   Create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live data."
    );
  } else {
    console.error(
      "❌ Critical Error: Supabase environment variables are missing in production!"
    );
  }

  // Provide a safe dummy client so the app doesn't crash
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      // Add other methods as needed for safety
    }),
  } as any;
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Fetch posts based on active locale
export async function getPosts(locale: string) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt, published_at, tags')
      .eq('locale', locale)
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error(`Error fetching posts: [${error.code}] ${error.message}`);
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Data stream fetch failure:', err);
    return []; // Return fallback empty array to prevent UI crashing
  }
}