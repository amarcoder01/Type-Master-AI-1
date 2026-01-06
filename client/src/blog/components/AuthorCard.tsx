import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorCardProps {
  author: {
    name: string;
    bio?: string | null;
    avatarUrl?: string | null;
  };
  publishedAt?: string | null;
  className?: string;
}

export function AuthorCard({ author, publishedAt, className = "" }: AuthorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            {author.avatarUrl && <AvatarImage src={author.avatarUrl} alt={author.name} />}
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {getInitials(author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg">{author.name}</div>
            {publishedAt && (
              <div className="text-sm text-muted-foreground mt-0.5">
                Published on {formatDate(publishedAt)}
              </div>
            )}
            {author.bio && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {author.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

