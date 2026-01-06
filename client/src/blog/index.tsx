import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard, BlogHero, BlogSearch } from "./components";
import { ArrowRight, Rss, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  authorName: string;
  status: string;
  publishedAt: string | null;
  updatedAt: string;
  viewCount?: number;
  wordCount?: number;
  readingTimeMinutes?: number;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export default function BlogIndex() {
  useSEO({
    title: "TypeMasterAI Blog | Guides, Tips, and Product Updates",
    description: "Professional articles on typing, productivity, learning, and product updates. Improve your typing speed with expert tips and guides.",
    keywords: "typing blog, productivity tips, typing guides, learning, updates, typing speed improvement",
    canonical: "/blog",
    ogUrl: "/blog",
  });

  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch featured post
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/blog/featured?limit=1");
        if (res.ok) {
          const data = await res.json();
          if (data.posts?.[0]) {
            setFeaturedPost(data.posts[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch featured post:", err);
      }
    };
    fetchFeatured();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/blog/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts
  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);
      
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", "9");
        if (categoryFilter) params.set("category", categoryFilter);
        
        const res = await fetch(`/api/blog/posts?${params}`, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          const newPosts = (data.posts || []).filter((p: BlogPost) => p.status === "published");
          
          if (page === 1) {
            // Filter out featured post from regular list
            setPosts(featuredPost 
              ? newPosts.filter((p: BlogPost) => p.id !== featuredPost.id)
              : newPosts
            );
          } else {
            setPosts(prev => [...prev, ...newPosts.filter((p: BlogPost) => 
              !prev.find(existing => existing.id === p.id) && p.id !== featuredPost?.id
            )]);
          }
          
          setTotalPages(data.pagination?.totalPages || 1);
          setHasMore(page < (data.pagination?.totalPages || 1));
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Failed to fetch posts:", err);
        }
      }
      
      setLoading(false);
      setLoadingMore(false);
    };
    
    fetchPosts();
    return () => controller.abort();
  }, [page, categoryFilter, featuredPost]);

  // Infinite scroll
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loadingMore) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        setPage(prev => prev + 1);
      }
    }, { rootMargin: "200px" });
    
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  const handleCategoryFilter = (slug: string | null) => {
    setCategoryFilter(slug);
    setPage(1);
    setPosts([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Blog
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Articles, guides, and tips to improve your typing skills.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BlogSearch className="w-64" />
            <Button variant="outline" size="icon" asChild title="RSS Feed">
              <a href="/blog/rss.xml" target="_blank" rel="noopener">
                <Rss className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-6">
          <Button
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryFilter(null)}
          >
            All
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
          <Link href="/blog/tags">
            <Button variant="ghost" size="sm" className="gap-1">
              <Tag className="h-3 w-3" />
              All Tags
            </Button>
          </Link>
        </div>
      </header>

      {/* Featured Post */}
      {featuredPost && !categoryFilter && page === 1 && (
        <section className="mb-12">
          <BlogHero post={featuredPost} />
        </section>
      )}

      {/* Posts Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/9] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
          <p className="text-muted-foreground">
            Check back soon for new content!
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Loading more indicator */}
          {loadingMore && (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-muted-foreground">Loading more...</div>
            </div>
          )}

          {/* Load more button (fallback) */}
          {hasMore && !loadingMore && (
            <div className="flex justify-center mt-10">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setPage(prev => prev + 1)}
                className="group"
              >
                Load More Articles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-1 w-full" />
        </>
      )}

      {/* Popular Posts Sidebar (on larger screens) */}
      {/* TODO: Add sidebar with popular posts */}
    </div>
  );
}
