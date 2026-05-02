import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { TaskPostCard } from '@/components/shared/task-post-card'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'

  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )

  const posts = feed?.posts || []

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#cad9e6] bg-white p-8 shadow-[0_22px_55px_rgba(12,34,52,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#617587]">Search</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Find visuals, creators, and media posts faster</h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#516472]">
              Search across image posts and discover fresh content quickly with category and task filters.
            </p>

            <form action="/search" className="mt-8 grid gap-3 md:grid-cols-[1fr_auto]">
              <input type="hidden" name="master" value="1" />
              {category ? <input type="hidden" name="category" value={category} /> : null}
              {task ? <input type="hidden" name="task" value={task} /> : null}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b8090]" />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search image posts, tags, and creator content..."
                  className="h-12 w-full rounded-xl border border-[#cddce9] bg-[#f8fbff] pl-9 pr-4 text-sm outline-none transition focus:border-[#84adcf]"
                />
              </div>
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#133e5f] px-6 text-sm font-semibold text-white hover:bg-[#0f324f]">
                <SlidersHorizontal className="h-4 w-4" />
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              {query ? `Results for "${query}"` : 'Trending visual content'}
            </h2>
            <p className="text-sm text-[#5d7181]">{results.length} results</p>
          </div>

          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const postTask = getPostTaskKey(post)
                const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`
                return <TaskPostCard key={post.id} post={post} href={href} />
              })}
            </div>
          ) : (
            <div className="rounded-[1.3rem] border border-dashed border-[#c4d5e4] bg-white p-10 text-center text-[#607486]">
              No matching media found. Try another keyword or category.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
