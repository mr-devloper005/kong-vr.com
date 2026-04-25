import Link from 'next/link'
import { Camera, Globe2, ShieldCheck, Sparkles, Users, Video } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Visual-first publishing',
    body: 'Every layout is built to showcase photography and video, not hide it inside dense widgets.',
    icon: Camera,
  },
  {
    title: 'Ownership and control',
    body: 'Manage media, categories, and identity with a clean creator workflow that stays in your hands.',
    icon: ShieldCheck,
  },
  {
    title: 'Community ready',
    body: 'From solo portfolios to group albums, the platform adapts to creators, teams, and communities.',
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <ContentImage
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80"
              alt="About hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,24,40,0.70)_0%,rgba(9,24,40,0.58)_50%,rgba(9,24,40,0.68)_100%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">About {SITE_CONFIG.name}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Built for creators who want media to be the main story
            </h1>
            <p className="mt-6 max-w-3xl text-base text-slate-200">
              {SITE_CONFIG.name} is an image and video platform designed for faster publishing, cleaner discovery, and stronger creator identity.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/images" className="inline-flex items-center gap-2 rounded-full bg-[#d5e9fb] px-6 py-3 text-sm font-semibold text-[#133a5a] hover:bg-[#c5e1f8]">
                Explore images
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                Contact our team
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-[1.4rem] border border-[#cfdeea] bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#607384]">Creators</h2>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">12k+</p>
              <p className="mt-2 text-sm text-[#536573]">Active image and video publishers</p>
            </article>
            <article className="rounded-[1.4rem] border border-[#cfdeea] bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#607384]">Media Uploaded</h2>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">2.4M+</p>
              <p className="mt-2 text-sm text-[#536573]">Photos, reels, and curated albums</p>
            </article>
            <article className="rounded-[1.4rem] border border-[#cfdeea] bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#607384]">Monthly Reach</h2>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.04em]">980k</p>
              <p className="mt-2 text-sm text-[#536573]">Visual views across creator pages</p>
            </article>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div className="rounded-[1.8rem] border border-[#d6e2ec] bg-[#f7fbff] p-7">
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">What we stand for</h2>
              <p className="mt-4 text-sm leading-8 text-[#4f6372]">
                We believe media platforms should feel calm, clear, and creator-friendly. That means fewer distracting blocks and stronger image surfaces.
              </p>
              <div className="mt-6 grid gap-3">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-xl border border-[#d4e2ee] bg-white p-4">
                    <pillar.icon className="h-5 w-5 text-[#2b82c7]" />
                    <h3 className="mt-3 text-lg font-semibold">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-[#536573]">{pillar.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <article className="rounded-[1.6rem] border border-[#d6e2ec] bg-[#f1f8ff] p-6">
                <p className="inline-flex items-center gap-2 text-xl font-semibold">
                  <Sparkles className="h-5 w-5 text-[#2b82c7]" />
                  Designed for visual momentum
                </p>
                <p className="mt-3 text-sm leading-7 text-[#526371]">
                  From upload to showcase, each step is made to keep creators moving fast with clean tools.
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-[#d6e2ec] bg-[#f1f8ff] p-6">
                <p className="inline-flex items-center gap-2 text-xl font-semibold">
                  <Video className="h-5 w-5 text-[#2b82c7]" />
                  Image and video in one flow
                </p>
                <p className="mt-3 text-sm leading-7 text-[#526371]">
                  Publish photography, short clips, and long-form visuals in a single consistent workspace.
                </p>
              </article>
              <article className="rounded-[1.6rem] border border-[#d6e2ec] bg-[#f1f8ff] p-6">
                <p className="inline-flex items-center gap-2 text-xl font-semibold">
                  <Globe2 className="h-5 w-5 text-[#2b82c7]" />
                  Built for global communities
                </p>
                <p className="mt-3 text-sm leading-7 text-[#526371]">
                  Support creator groups, niche communities, and teams that need elegant visual spaces.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
