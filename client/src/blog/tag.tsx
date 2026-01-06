import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  authorName: string;
  publishedAt: string | null;
  wordCount?: number;
  readingTimeMinutes?: number;
}

export default function BlogTagPage() {
  const [, params] = useRoute("/blog/tag/:slug");
  const slug = params?.slug || "";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: `Posts tagged "${slug}" | TypeMasterAI Blog`,
    description: `Articles tagged "${slug}" on the TypeMasterAI Blog.`,
    keywords: `typing blog, ${slug}`,
    canonical: `/blog/tag/${slug}`,
    ogUrl: `/blog/tag/${slug}`,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/blog/posts?tag=${encodeURIComponent(slug)}&page=1&limit=20`, { signal: controller.signal });
      if (!res.ok) {
        setPosts([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
      setLoading(false);
    };
    if (slug) fetchPosts();
    return () => controller.abort();
  }, [slug]);

  if (loading) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tag: {slug}</h1>
      <div className="mt-6 space-y-6">
        {posts.length === 0 ? (
          <div className="text-muted-foreground">No posts found for this tag.</div>
        ) : posts.map(post => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {post.excerpt && <p className="text-muted-foreground">{post.excerpt}</p>}
              <div className="mt-3 text-xs text-muted-foreground">
                <span>{post.authorName}</span>
                {post.publishedAt && <span className="ml-2">• {new Date(post.publishedAt).toLocaleDateString()}</span>}
                {typeof post.readingTimeMinutes === 'number' && <span className="ml-2">• {post.readingTimeMinutes} min read</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
