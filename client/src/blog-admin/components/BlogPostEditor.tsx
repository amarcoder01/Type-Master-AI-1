import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  List,
  ListOrdered,
  Quote,
  Save,
  Eye,
  ArrowLeft,
  Calendar,
  X,
} from "lucide-react";
import { SEOPreview } from "./SEOPreview";

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

interface BlogPostInput {
  id?: number;
  slug: string;
  title: string;
  excerpt: string | null;
  contentMd: string;
  coverImageUrl: string | null;
  authorId?: string | null;
  authorName: string;
  authorBio: string | null;
  authorAvatarUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  categoryId: number | null;
  status: "draft" | "review" | "scheduled" | "published";
  scheduledAt: string | null;
  publishedAt: string | null;
  isFeatured: boolean;
  featuredOrder: number | null;
  tags: string[];
}

interface BlogPostEditorProps {
  post?: BlogPostInput;
  categories: BlogCategory[];
  onSave: (post: BlogPostInput) => Promise<void>;
  onBack: () => void;
  saving: boolean;
}

const defaultPost: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: null,
  contentMd: "",
  coverImageUrl: null,
  authorName: "TypeMasterAI",
  authorBio: null,
  authorAvatarUrl: null,
  metaTitle: null,
  metaDescription: null,
  categoryId: null,
  status: "draft",
  scheduledAt: null,
  publishedAt: null,
  isFeatured: false,
  featuredOrder: null,
  tags: [],
};

export function BlogPostEditor({
  post: initialPost,
  categories,
  onSave,
  onBack,
  saving,
}: BlogPostEditorProps) {
  const [post, setPost] = useState<BlogPostInput>(initialPost || defaultPost);
  const [tagInput, setTagInput] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialPost && post.title && !post.slug) {
      const slug = post.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 200);
      setPost((prev) => ({ ...prev, slug }));
    }
  }, [post.title, initialPost]);

  // Autosave every 30 seconds for drafts
  useEffect(() => {
    if (post.status !== "draft" || !post.title || !post.contentMd) return;
    
    const timer = setInterval(() => {
      handleSave(true);
    }, 30000);
    
    return () => clearInterval(timer);
  }, [post]);

  const update = useCallback((key: keyof BlogPostInput, value: any) => {
    setPost((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = async (isAutosave = false) => {
    await onSave(post);
    if (!isAutosave) {
      setLastSaved(new Date());
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = post.contentMd.substring(start, end);
    const newText =
      post.contentMd.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      post.contentMd.substring(end);
    
    update("contentMd", newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (tag && !post.tags.includes(tag)) {
      update("tags", [...post.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    update("tags", post.tags.filter((t) => t !== tag));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {initialPost ? "Edit Post" : "New Post"}
            </h1>
            {lastSaved && (
              <p className="text-xs text-muted-foreground">
                Last saved {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={post.status}
            onValueChange={(v) => update("status", v)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleSave()} disabled={saving || !post.title || !post.contentMd}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Enter post title..."
              className="text-lg font-medium"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/blog/</span>
              <Input
                id="slug"
                value={post.slug}
                onChange={(e) => update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                placeholder="post-url-slug"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Content</Label>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="h-8">
                  <TabsTrigger value="write" className="text-xs px-3 h-7">Write</TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs px-3 h-7">
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Markdown Toolbar */}
            {activeTab === "write" && (
              <div className="flex flex-wrap gap-1 p-2 border rounded-t-lg bg-muted/50">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("**", "**")}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("*", "*")}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("# ")}>
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("## ")}>
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("### ")}>
                  <Heading3 className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("[", "](url)")}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("![alt](", ")")}>
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("`", "`")}>
                  <Code className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("- ")}>
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("1. ")}>
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertMarkdown("> ")}>
                  <Quote className="h-4 w-4" />
                </Button>
              </div>
            )}

            {activeTab === "write" ? (
              <Textarea
                ref={textareaRef}
                value={post.contentMd}
                onChange={(e) => update("contentMd", e.target.value)}
                placeholder="Write your post content in Markdown..."
                className="min-h-[500px] font-mono text-sm rounded-t-none"
              />
            ) : (
              <div className="prose prose-sm sm:prose dark:prose-invert max-w-none min-h-[500px] p-4 border rounded-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.contentMd || "*No content yet*"}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={post.excerpt || ""}
              onChange={(e) => update("excerpt", e.target.value || null)}
              placeholder="Brief summary for listings and social sharing..."
              rows={3}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground text-right">
              {(post.excerpt || "").length}/300
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.status === "scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledAt" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Date
                  </Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={post.scheduledAt?.slice(0, 16) || ""}
                    onChange={(e) => update("scheduledAt", e.target.value ? new Date(e.target.value).toISOString() : null)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="cursor-pointer">Featured Post</Label>
                <Switch
                  id="featured"
                  checked={post.isFeatured}
                  onCheckedChange={(checked) => update("isFeatured", checked)}
                />
              </div>

              {post.isFeatured && (
                <div className="space-y-2">
                  <Label htmlFor="featuredOrder">Featured Order</Label>
                  <Input
                    id="featuredOrder"
                    type="number"
                    min={0}
                    value={post.featuredOrder ?? ""}
                    onChange={(e) => update("featuredOrder", e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="0 = first"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={post.categoryId?.toString() || "none"}
                onValueChange={(v) => update("categoryId", v === "none" ? null : parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Category</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                />
                <Button variant="outline" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                value={post.coverImageUrl || ""}
                onChange={(e) => update("coverImageUrl", e.target.value || null)}
                placeholder="https://example.com/image.jpg"
              />
              {post.coverImageUrl && (
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Author */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Author</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="authorName">Name</Label>
                <Input
                  id="authorName"
                  value={post.authorName}
                  onChange={(e) => update("authorName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorBio">Bio</Label>
                <Textarea
                  id="authorBio"
                  value={post.authorBio || ""}
                  onChange={(e) => update("authorBio", e.target.value || null)}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorAvatar">Avatar URL</Label>
                <Input
                  id="authorAvatar"
                  value={post.authorAvatarUrl || ""}
                  onChange={(e) => update("authorAvatarUrl", e.target.value || null)}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <SEOPreview
            title={post.metaTitle || post.title}
            description={post.metaDescription || post.excerpt || ""}
            slug={post.slug}
            onTitleChange={(v) => update("metaTitle", v || null)}
            onDescriptionChange={(v) => update("metaDescription", v || null)}
          />
        </div>
      </div>
    </div>
  );
}

