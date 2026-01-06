import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogHeroProps {
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    authorName: string;
    publishedAt: string | null;
    readingTimeMinutes?: number;
    categoryName?: string;
  };
}

export function BlogHero({ post }: BlogHeroProps) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="default" className="bg-primary/90">
              Featured
            </Badge>
            {post.categoryName && (
              <Badge variant="outline">{post.categoryName}</Badge>
            )}
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>
          
          {post.excerpt && (
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
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
          </div>
          
          <div className="mt-8">
            <Link href={`/blog/${post.slug}`}>
              <Button size="lg" className="group">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative aspect-[4/3] lg:aspect-auto order-1 lg:order-2">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-6xl opacity-50">📝</div>
            </div>
          )}
          {/* Gradient overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </div>
  );
}

