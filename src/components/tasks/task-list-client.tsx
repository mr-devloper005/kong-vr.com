"use client";

import { useMemo, useEffect } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  // Debug filtering
  useEffect(() => {
    console.log('[Filter Debug] Category:', category);
    console.log('[Filter Debug] Total posts:', initialPosts.length);
    if (initialPosts.length > 0) {
      const firstPost = initialPosts[0];
      const content = firstPost.content as any;
      const tags = firstPost.tags || [];
      const validTag = tags.find((t: string) => isValidCategory(String(t)));
      console.log('[Filter Debug] First post:', {
        title: firstPost.title?.slice(0, 30),
        contentCategory: content?.category,
        tags: tags,
        detectedCategory: content?.category || validTag || 'none'
      });
    }
  }, [category, initialPosts]);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const contentCategory =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      // Find first valid category tag (skip task type tags like "image", "article", etc.)
      const tags = Array.isArray(post.tags) ? post.tags : [];
      const validCategoryTag = tags.find((t) => isValidCategory(String(t)));
      const tagCategory = validCategoryTag ? normalizeCategory(String(validCategoryTag)) : "";
      const value = contentCategory || tagCategory;
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        {category && category !== 'all' 
          ? `No posts found for category "${category}". Try selecting a different category.` 
          : 'No posts yet for this section.'}
      </div>
    );
  }

  const gridClass =
    task === "image"
      ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      : task === "profile"
        ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={gridClass}>
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
