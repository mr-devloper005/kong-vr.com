import Link from 'next/link'
import { Camera, Image as ImageIcon, Layers3, Sparkles, Video } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { CategoryFilterForm } from '@/components/tasks/category-filter-form'
import { normalizeCategory } from '@/lib/categories'
import { fetchTaskPosts } from '@/lib/task-data'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('image', {
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  })

const featureTiles = [
  {
    title: 'Creator Portfolios',
    body: 'Highlight your best frames with gallery-led structure and cleaner pacing.',
    icon: Camera,
  },
  {
    title: 'Visual Stories',
    body: 'Mix reels and stills in a surface that feels more like a feature spread than a simple feed.',
    icon: Video,
  },
  {
    title: 'Curated Collections',
    body: 'Group image sets by campaign, style, or series with stronger visual hierarchy.',
    icon: Sparkles,
  },
]

export default async function ImageSharingPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const params = await searchParams
  const rawCategory = params?.category || 'all'
  const normalizedCategory = rawCategory === 'all' ? 'all' : normalizeCategory(rawCategory)
  const posts = await fetchTaskPosts('image', 40)
  const spotlight = posts.slice(0, 3)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef3f8_0%,#f9fbfd_45%,#ffffff_100%)] text-[#15232e]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#d4dee8] bg-[#091525] text-white">
          <div className="absolute inset-0">
            <ContentImage
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
              alt="Images page hero background"
              fill
              className="object-cover opacity-35"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,168,255,0.28),transparent_26%),linear-gradient(180deg,rgba(9,21,37,0.92)_0%,rgba(9,21,37,0.84)_55%,rgba(9,21,37,0.94)_100%)]" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-18">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Image Gallery</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                A visual feed with stronger staging, pacing, and gallery presence
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">
                Explore photos and videos through a more editorial surface inspired by creator-journal layouts, with better spotlighting for standout work and cleaner support details around it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/create/image" className="inline-flex items-center gap-2 rounded-full bg-[#f2f6fb] px-6 py-3 text-sm font-semibold text-[#10263e] hover:bg-white">
                  Publish image
                </Link>
                <Link href="/search?task=image&master=1" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/16">
                  Search media
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-[1.9rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm md:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">Layout note</p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  The card rhythm now leans toward a featured gallery board instead of a flat directory, giving image-heavy posts more room to feel premium.
                </p>
              </article>
              {[
                { label: 'Featured drops', value: `${posts.length}+`, icon: Layers3 },
                { label: 'Media-first surface', value: 'Editorial', icon: ImageIcon },
              ].map((item) => (
                <article key={item.label} className="rounded-[1.7rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                  <item.icon className="h-5 w-5 text-[#9ad0ff]" />
                  <p className="mt-8 text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[2rem] border border-[#d1dde9] bg-white p-6 shadow-[0_25px_70px_rgba(13,34,52,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#617688]">Spotlight board</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#15232e]">What this gallery page now emphasizes</h2>
                </div>
                <ImageIcon className="h-5 w-5 text-[#2b82c7]" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {featureTiles.map((tile) => (
                  <article key={tile.title} className="rounded-[1.5rem] border border-[#cfdeea] bg-[#f8fbff] p-5">
                    <tile.icon className="h-5 w-5 text-[#2b82c7]" />
                    <h2 className="mt-3 text-lg font-semibold">{tile.title}</h2>
                    <p className="mt-2 text-sm text-[#536573]">{tile.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <CategoryFilterForm key={rawCategory} currentCategory={normalizedCategory} />

              <div className="rounded-[1.8rem] border border-[#cfdeea] bg-[#f7fbff] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#627788]">Current spotlight</p>
                <div className="mt-4 space-y-4">
                  {spotlight.map((item, index) => (
                    <Link key={item.id} href={`/images/${item.slug}`} className="flex items-start gap-4 rounded-[1.2rem] border border-[#d4e1ec] bg-white p-4 transition hover:-translate-y-0.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#143d5f] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-[#15232e]">{item.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-[#5c707e]">{item.summary || 'Fresh visual story from the gallery feed.'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
