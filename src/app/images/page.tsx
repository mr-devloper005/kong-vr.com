import Link from 'next/link'
import { Camera, Filter, Image as ImageIcon, Sparkles, Video } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchTaskPosts } from '@/lib/task-data'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('image', {
    path: '/images',
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  })

const featureTiles = [
  {
    title: 'Creator Portfolios',
    body: 'Highlight your best frames with clean gallery-first structure.',
    icon: Camera,
  },
  {
    title: 'Visual Stories',
    body: 'Mix reels and stills to create richer media narratives.',
    icon: Video,
  },
  {
    title: 'Curated Collections',
    body: 'Organize image sets by style, theme, or campaign.',
    icon: Sparkles,
  },
]

export default async function ImageSharingPage({ searchParams }: { searchParams?: { category?: string } }) {
  const normalizedCategory = searchParams?.category ? normalizeCategory(searchParams.category) : 'all'
  const posts = await fetchTaskPosts('image', 40)

  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <ContentImage
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
              alt="Images page hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,23,39,0.70)_0%,rgba(8,23,39,0.60)_55%,rgba(8,23,39,0.70)_100%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">Image Gallery</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Explore photos and videos from creators around the world
            </h1>
            <p className="mt-5 max-w-3xl text-base text-slate-200">
              Discover fresh visuals, browse category-based collections, and find inspiration from image-first creators.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/create/image" className="inline-flex items-center gap-2 rounded-full bg-[#d3e8fb] px-6 py-3 text-sm font-semibold text-[#12395a] hover:bg-[#c4e0f7]">
                Publish image
              </Link>
              <Link href="/search?task=image&master=1" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                Search media
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-3">
              {featureTiles.map((tile) => (
                <article key={tile.title} className="rounded-[1.2rem] border border-[#cfdeea] bg-white p-5">
                  <tile.icon className="h-5 w-5 text-[#2b82c7]" />
                  <h2 className="mt-3 text-lg font-semibold">{tile.title}</h2>
                  <p className="mt-2 text-sm text-[#536573]">{tile.body}</p>
                </article>
              ))}
            </div>

            <form action="/images" className="rounded-[1.3rem] border border-[#cfdeea] bg-white p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5f7384]">
                <Filter className="h-4 w-4" />
                Filter by category
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <select
                  name="category"
                  defaultValue={normalizedCategory}
                  className="h-11 min-w-[220px] rounded-xl border border-[#cfdeea] bg-[#f7fbff] px-3 text-sm outline-none focus:border-[#86adcf]"
                >
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className="h-11 rounded-xl bg-[#143d5f] px-5 text-sm font-semibold text-white hover:bg-[#0f324e]">
                  Apply
                </button>
              </div>
              <p className="mt-3 text-sm text-[#59707e]">Tip: Use categories to focus on specific visual styles faster.</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-[#2b82c7]" />
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Latest image posts</h2>
          </div>
          <TaskListClient task="image" initialPosts={posts} category={normalizedCategory} />
        </section>
      </main>
      <Footer />
    </div>
  )
}
