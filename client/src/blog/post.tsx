import { useEffect, useState, useRef, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useSEO } from "@/lib/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AuthorCard, 
  BlogCard, 
  ShareButtons, 
  TableOfContents, 
  ReadingProgress 
} from "./components";
import { ArrowLeft, Calendar, Clock, Eye, Copy, Check } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  contentMd: string;
  coverImageUrl: string | null;
  authorName: string;
  authorBio: string | null;
  authorAvatarUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  status: string;
  publishedAt: string | null;
  updatedAt: string;
  viewCount: number;
  wordCount?: number;
  readingTimeMinutes?: number;
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog/post/${slug}`, { signal: controller.signal });
        if (!res.ok) {
          setPost(null);
          setRelated([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPost(data.post || null);
        setRelated((data.related || []).slice(0, 4));
        
        // Record view
        if (data.post) {
          fetch(`/api/blog/post/${slug}/view`, { method: "POST" }).catch(() => {});
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setPost(null);
          setRelated([]);
        }
      }
      setLoading(false);
    };
    
    if (slug) fetchPost();
    return () => controller.abort();
  }, [slug]);

  useSEO({
    title: post?.metaTitle || post?.title ? `${post.metaTitle || post.title} | TypeMasterAI Blog` : "Blog Article | TypeMasterAI",
    description: post?.metaDescription || post?.excerpt || "Read this article on the TypeMasterAI blog.",
    keywords: "typing blog, article",
    canonical: `/blog/${slug}`,
    ogUrl: `/blog/${slug}`,
    structuredData: post ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || "",
      "image": post.coverImageUrl || undefined,
      "author": {
        "@type": "Person",
        "name": post.authorName,
      },
      "publisher": {
        "@type": "Organization",
        "name": "TypeMasterAI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://typemasterai.com/icon-512x512.png",
        },
      },
      "datePublished": post.publishedAt,
      "dateModified": post.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://typemasterai.com/blog/${slug}`,
      },
    } : undefined,
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const copyCodeToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Custom components for ReactMarkdown
  const markdownComponents = useMemo(() => ({
    h1: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return <h3 id={id} {...props}>{children}</h3>;
    },
    pre: ({ children }: any) => {
      const codeElement = children?.props;
      const code = codeElement?.children || "";
      
      return (
        <div className="relative group">
          <pre className="!mt-0">{children}</pre>
          <button
            onClick={() => copyCodeToClipboard(code)}
            className="absolute top-2 right-2 p-2 rounded bg-muted/80 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy code"
          >
            {copiedCode === code ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    },
    img: ({ src, alt, ...props }: any) => (
      <figure className="my-8">
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg w-full cursor-pointer"
          loading="lazy"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  }), [copiedCode]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="aspect-[2/1] w-full rounded-lg mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/blog">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress contentRef={contentRef} />
      
      <article className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.authorName}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            {post.readingTimeMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTimeMinutes} min read
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.viewCount.toLocaleString()} views
            </span>
          </div>

          {/* Share */}
          <div className="mt-6">
            <ShareButtons url={`/blog/${slug}`} title={post.title} />
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="aspect-[2/1] rounded-xl overflow-hidden mb-10">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Content with TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
          {/* Main content */}
          <section 
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:scroll-mt-20
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted/50 prose-pre:border
              prose-img:rounded-lg
              prose-blockquote:border-l-primary
            "
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkMath]} 
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {post.contentMd}
            </ReactMarkdown>
          </section>

          {/* Sticky TOC - desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={post.contentMd} />
            </div>
          </aside>
        </div>

        {/* Author Card */}
        <div className="mt-12">
          <AuthorCard 
            author={{
              name: post.authorName,
              bio: post.authorBio,
              avatarUrl: post.authorAvatarUrl,
            }}
            publishedAt={post.publishedAt}
          />
        </div>

        {/* Share again at bottom */}
        <div className="mt-8 pt-8 border-t flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Enjoyed this article?</span>
          <ShareButtons url={`/blog/${slug}`} title={post.title} />
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map(r => (
                <BlogCard key={r.id} post={r} variant="horizontal" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
