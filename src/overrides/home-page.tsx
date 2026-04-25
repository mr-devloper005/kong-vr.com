import Link from 'next/link'
import { ArrowRight, Camera, Images, Rss, Sparkles, Video } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const heroImages = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1400&q=80',
]

const newsCards = [
  {
    title: 'New Gallery Layout',
    subtitle: 'A cleaner visual wall for photos and reels.',
    image: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Faster Upload Flow',
    subtitle: 'Batch upload and instant previews for creators.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Community Albums',
    subtitle: 'Shared collections for teams and creators.',
    image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=900&q=80',
  },
]

const useCases = [
  { title: 'Photographers', text: 'Build polished visual portfolios and private client albums.', icon: Camera },
  { title: 'Creator Teams', text: 'Collaborate on shared galleries for campaigns and launches.', icon: Images },
  { title: 'Video Publishers', text: 'Host cinematic clips, loops, and motion reels with ease.', icon: Video },
]

export async function HomePageOverride() {
  return (
    <div className="min-h-screen bg-[#eef1f4] text-[#162028]">
      <NavbarShell />
      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <ContentImage src={heroImages[0]} alt="Mountain hero background" fill className="h-full w-full object-cover" priority />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,43,0.62)_0%,rgba(10,25,43,0.48)_48%,rgba(10,25,43,0.58)_100%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center text-white">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Your own self-hosted image and video sharing platform
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base text-slate-100 sm:text-lg">
                Share galleries, build creator pages, and host high-quality media with a beautiful image-first experience.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link href="/images" className="inline-flex items-center gap-2 rounded-full bg-[#d8ecff] px-6 py-3 text-sm font-semibold text-[#123a5a] hover:bg-[#c5e2fb]">
                  Explore Gallery
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/create/image" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                  Start Uploading
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-14 grid max-w-5xl gap-3 rounded-[2rem] border border-white/20 bg-white/8 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm md:grid-cols-5">
              {heroImages.map((image, index) => (
                <div key={image} className={index === 0 ? 'relative h-56 overflow-hidden rounded-[1.3rem] md:col-span-2 md:h-72' : 'relative h-40 overflow-hidden rounded-[1.3rem] md:h-72'}>
                  <ContentImage src={image} alt={`Featured gallery item ${index + 1}`} fill className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1a242d]">Start hosting your videos and photos</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base text-[#4e5f6d]">
                No restrictions and no cluttered experience. Publish image collections and videos in a clean, modern interface.
              </p>
            </div>
            <div className="mt-9 flex items-center justify-center">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[#c9dff2] px-6 py-3 text-sm font-semibold text-[#154064] hover:bg-[#bad6ed]">
                Try online
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#e8edf2]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="inline-flex items-center gap-2 text-4xl font-semibold tracking-[-0.03em] text-[#1b2630]">
                <Rss className="h-8 w-8 text-[#2b82c7]" />
                Kong VR News
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-base text-[#4f5f6d]">
                Stay updated with recent improvements for gallery publishing, creator pages, and media hosting.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {newsCards.map((card) => (
                <article key={card.title} className="overflow-hidden rounded-[1.3rem] border border-[#d2dde8] bg-white shadow-sm">
                  <div className="relative h-44">
                    <ContentImage src={card.image} alt={card.title} fill className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#1b2530]">{card.title}</h3>
                    <p className="mt-2 text-sm text-[#52626f]">{card.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2f4f6]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#1a242d]">Made for image-first communities</h2>
              <p className="mx-auto mt-5 max-w-3xl text-base text-[#4e5f6d]">
                Designed for visual storytelling, creator portfolios, and modern media teams.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {useCases.map((item) => (
                <article key={item.title} className="rounded-[1.2rem] border border-[#d8e1e8] bg-white p-6">
                  <item.icon className="h-7 w-7 text-[#2b82c7]" />
                  <h3 className="mt-4 text-2xl font-semibold text-[#1b2530]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#52626f]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="inline-flex items-center gap-2 text-4xl font-semibold tracking-[-0.04em] text-[#1a242d]">
              <Sparkles className="h-8 w-8 text-[#2b82c7]" />
              Ready to launch your media hub?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base text-[#4e5f6d]">
              Sign in and start publishing. Your account stays saved in local storage for fast return sessions.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[#d1e6f7] px-6 py-3 text-sm font-semibold text-[#123a5a] hover:bg-[#c2ddef]">
                Login
              </Link>
              <Link href="/images" className="inline-flex items-center gap-2 rounded-full border border-[#d0dce8] px-6 py-3 text-sm font-semibold text-[#1d2a35] hover:bg-[#f1f5f9]">
                Browse images
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
