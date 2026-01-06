import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Eye } from "lucide-react";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    authorName: string;
    publishedAt: string | null;
    readingTimeMinutes?: number;
    viewCount?: number;
    categoryName?: string;
    categorySlug?: string;
  };
  variant?: "default" | "compact" | "horizontal";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <div className="flex flex-col sm:flex-row">
            {post.coverImageUrl && (
              <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <CardContent className="flex-1 p-4 flex flex-col justify-center">
              {post.categoryName && (
                <Badge variant="secondary" className="w-fit mb-2 text-xs">
                  {post.categoryName}
                </Badge>
              )}
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </span>
                {post.readingTimeMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTimeMinutes} min
                  </span>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.slug}`}>
        <div className="group flex gap-4 py-4 border-b last:border-0 hover:bg-muted/50 px-2 -mx-2 rounded transition-colors">
          {post.coverImageUrl && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTimeMinutes && (
                <span>{post.readingTimeMinutes} min read</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
        {post.coverImageUrl && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <CardContent className="p-5">
          {post.categoryName && (
            <Badge variant="secondary" className="mb-3 text-xs font-normal">
              {post.categoryName}
            </Badge>
          )}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
              {post.readingTimeMinutes && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTimeMinutes} min
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

