import { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Copy, Check, User, Monitor, Tablet, Smartphone, Moon, Sun } from "lucide-react";
import { TableOfContents } from "@/blog/components/TableOfContents";
import { cn } from "@/lib/utils";

interface AdvancedPreviewProps {
  post: {
    title: string;
    excerpt: string | null;
    contentMd: string;
    coverImageUrl: string | null;
    authorName: string;
    authorBio: string | null;
    authorAvatarUrl: string | null;
    publishedAt: string | null;
    tags: string[];
    readingTimeMinutes?: number;
  };
}

type DeviceType = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<DeviceType, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
};

export function AdvancedPreview({ post }: AdvancedPreviewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [darkMode, setDarkMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Today (Preview)";
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

  const readingTime = useMemo(() => {
    const words = post.contentMd.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  }, [post.contentMd]);

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
        <div className="relative group my-6">
          <pre className="!mt-0 !mb-0">{children}</pre>
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
      <figure className="my-10">
        <img
          src={src}
          alt={alt || ""}
          className="rounded-xl w-full cursor-pointer shadow-sm"
          loading="lazy"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  }), [copiedCode]);

  const deviceWidth = DEVICE_WIDTHS[device];

  return (
    <div className="bg-background min-h-screen rounded-lg border shadow-sm overflow-hidden">
      {/* Preview Controls */}
      <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Live Preview Mode</span>
        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={device === "desktop" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setDevice("desktop")}
              title="Desktop Preview"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={device === "tablet" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setDevice("tablet")}
              title="Tablet Preview"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={device === "mobile" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setDevice("mobile")}
              title="Mobile Preview"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Device Frame */}
      <div className={cn(
        "p-4 overflow-x-auto",
        device !== "desktop" && "flex justify-center bg-muted/20"
      )}>
        <div 
          className={cn(
            "transition-all duration-300",
            device !== "desktop" && "border rounded-xl shadow-lg overflow-hidden",
            device === "tablet" && "border-8 border-gray-800 rounded-[2rem]",
            device === "mobile" && "border-[12px] border-gray-900 rounded-[2.5rem]",
            darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
          )}
          style={{ 
            width: device === "desktop" ? "100%" : `${deviceWidth}px`,
            minHeight: device === "desktop" ? "auto" : "500px"
          }}
        >
          <article className={cn(
            "mx-auto p-8",
            device === "desktop" && "max-w-5xl lg:p-12",
            device === "tablet" && "max-w-full p-6",
            device === "mobile" && "max-w-full p-4"
          )}>
        {/* Header */}
        <header className="mb-10 max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            {post.title || "Untitled Post"}
          </h1>

          {post.excerpt && (
            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-8 font-serif">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.authorAvatarUrl ? (
                <img src={post.authorAvatarUrl} alt={post.authorName} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
              <span className="font-medium text-foreground">{post.authorName}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImageUrl ? (
          <div className="max-w-4xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden mb-12 bg-muted shadow-md">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto aspect-[2.5/1] rounded-2xl overflow-hidden mb-12 bg-muted flex items-center justify-center text-muted-foreground border-2 border-dashed">
            No cover image selected
          </div>
        )}

        {/* Content with TOC */}
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12 max-w-5xl mx-auto">
          {/* Main content */}
          <div
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-[68ch] mx-auto
              prose-headings:scroll-mt-24
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {post.contentMd || "*Start writing to see preview...*"}
            </ReactMarkdown>
          </div>

          {/* Sticky TOC - desktop only */}
          {device === "desktop" && (
            <aside className="hidden lg:block h-full">
              <div className="sticky top-8">
                <div className={cn(
                  "text-sm font-semibold mb-4 tracking-wider uppercase",
                  darkMode ? "text-gray-400" : "text-muted-foreground"
                )}>
                  Contents
                </div>
                <TableOfContents content={post.contentMd} />
              </div>
            </aside>
          )}
        </div>
      </article>
        </div>
      </div>
    </div>
  );
}
