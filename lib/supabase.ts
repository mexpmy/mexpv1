// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fail-safe initialization verification
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "❌ Critical Error: Supabase environment variables are completely missing on the client side!\n" +
    "Verify that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

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