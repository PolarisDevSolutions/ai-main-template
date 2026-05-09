import { useEffect, useMemo, useState } from "react";
import type { Post } from "@/lib/database.types";
import type { InjectedPostData } from "@site/lib/pageDataInjection";
import BlogPostCard from "./BlogPostCard";
import { getPublicEnv } from "@site/lib/runtimeEnv";

interface PostWithCategory extends Post {
  post_categories: { name: string; slug: string } | null;
}

interface RecentPostsProps {
  excludeId?: string;
  initialPosts?: InjectedPostData[];
}

export default function RecentPosts({
  excludeId,
  initialPosts,
}: RecentPostsProps) {
  const seededPosts = useMemo(
    () => ((initialPosts || []) as PostWithCategory[])
      .filter((post) => (excludeId ? post.id !== excludeId : true))
      .slice(0, 3),
    [excludeId, initialPosts],
  );
  const [posts, setPosts] = useState<PostWithCategory[]>(seededPosts);
  const [loading, setLoading] = useState(!seededPosts.length);

  useEffect(() => {
    if (seededPosts.length) {
      setPosts(seededPosts);
      setLoading(false);
      return;
    }

    const fetchRecentPosts = async () => {
      const supabaseUrl = getPublicEnv("VITE_SUPABASE_URL");
      const supabaseKey = getPublicEnv("VITE_SUPABASE_ANON_KEY");

      if (!supabaseUrl || !supabaseKey) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/posts?status=eq.published&select=*,post_categories(name,slug)&order=published_at.desc&limit=4`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );

        if (res.ok) {
          const data: PostWithCategory[] = await res.json();
          const filtered = excludeId
            ? data.filter((post) => post.id !== excludeId)
            : data;
          setPosts(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching recent posts:", err);
      }

      setLoading(false);
    };

    fetchRecentPosts();
  }, [excludeId, seededPosts]);

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl md:text-4xl font-light text-gray-900 mb-10 text-center"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Recent Articles
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-4" />
                <div className="bg-gray-200 rounded h-4 w-3/4 mb-2" />
                <div className="bg-gray-200 rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
