import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef3f8_0%,#ffffff_36%)]">
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <section className="overflow-hidden rounded-[2rem] border border-[#d4dee8] bg-white shadow-[0_28px_80px_rgba(13,34,52,0.08)]">
          <div className="relative min-h-[220px] border-b border-[#d8e2eb] bg-[radial-gradient(circle_at_top_left,rgba(63,139,201,0.30),transparent_24%),linear-gradient(135deg,#11263f_0%,#264c70_55%,#dce7f1_160%)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
          </div>
          <div className="grid gap-8 p-6 md:p-8 xl:grid-cols-[280px_1fr] xl:items-start">
            <aside className="xl:-mt-28">
              <div className="rounded-[1.8rem] border border-[#d6e1ea] bg-white p-6 shadow-[0_18px_55px_rgba(13,34,52,0.08)]">
                <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-[#e8f0f7] shadow-sm">
                  {logoUrl ? (
                    <ContentImage src={logoUrl} alt={post.title} fill className="object-cover" sizes="144px" intrinsicWidth={144} intrinsicHeight={144} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[#637887]">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.3rem] border border-[#d8e2eb] bg-[#f8fbff] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#637887]">Profile type</p>
                    <p className="mt-2 text-sm text-[#223441]">Brand and creator identity page</p>
                  </div>
                  {domain ? (
                    <div className="rounded-[1.3rem] border border-[#d8e2eb] bg-[#fffaf3] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#637887]">Website</p>
                      <p className="mt-2 break-all text-sm text-[#223441]">{domain}</p>
                    </div>
                  ) : null}
                  {website ? (
                    <Button asChild size="lg" className="w-full rounded-full bg-[#123e60] text-base hover:bg-[#0f324e]">
                      <Link href={website} target="_blank" rel="noopener noreferrer">
                        Visit Official Site
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </aside>
            <div className="pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#637887]">Profile detail</p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#15232e] sm:text-5xl">{brandName}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-[#536573]">
                A more editorial brand profile surface with a stronger identity header, cleaner supporting facts, and a slower reading rhythm for descriptive content.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Identity-first profile header",
                  "Higher-trust website and brand cues",
                  "Cleaner descriptive reading area",
                  "Better separation from related content",
                ].map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-[#d8e2eb] bg-[#f8fbff] p-4 text-sm text-[#223441]">
                    {item}
                  </div>
                ))}
              </div>
              <article
                className="article-content prose prose-slate mt-8 max-w-3xl text-base leading-relaxed prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </div>
          </div>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
              <p className="text-sm font-semibold text-foreground">Related links</p>
              <ul className="mt-2 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
