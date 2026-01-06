import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";

interface TagItem {
  slug: string;
  name: string;
  count: number;
}

export default function BlogTagsPage() {
  useSEO({
    title: "Blog Tags | TypeMasterAI",
    description: "Browse blog tags and discover articles by topic.",
    keywords: "typing blog tags",
    canonical: "/blog/tags",
    ogUrl: "/blog/tags",
  });

  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const loadTags = async () => {
      setLoading(true);
      const res = await fetch("/api/blog/tags", { signal: controller.signal });
      if (!res.ok) {
        setTags([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTags(data.tags || []);
      setLoading(false);
    };
    loadTags();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tags</h1>
      <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tags.map(tag => (
          <li key={tag.slug}>
            <Link href={`/blog/tag/${tag.slug}`} className="inline-flex items-center justify-between w-full border rounded px-3 py-2 hover:bg-muted transition-colors">
              <span>{tag.name}</span>
              <span className="text-xs text-muted-foreground">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
