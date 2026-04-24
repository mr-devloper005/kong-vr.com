import Link from 'next/link'
import { ArrowRight, Camera, Github, Instagram, Mail, Twitter, Video } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const hiddenTaskKeys = new Set<TaskKey>(['listing', 'classified', 'article', 'profile', 'sbm', 'pdf'])

const platformLinks = SITE_CONFIG.tasks
  .filter((task) => task.enabled && !hiddenTaskKeys.has(task.key as TaskKey))
  .map((task) => ({
    name: task.label,
    href: task.route,
  }))

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Help Centre', href: '/help' },

  ],
  resources: [
    { name: 'Search', href: '/search' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  return (
    <footer className="bg-[linear-gradient(180deg,#dce8f2_0%,#c7d8e8_42%,#101f31_42.2%,#0a1626_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#c5d6e4] bg-[#f7fbff] p-8 text-[#172632] shadow-[0_28px_70px_rgba(16,38,58,0.18)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7384]">Media Newsletter</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Get fresh image and creator updates every month</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4f6372]">
                Product notes, gallery inspiration, and publishing ideas curated for visual creators.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl border border-[#c6d8e8] bg-white px-4 text-sm text-[#203341] outline-none transition focus:border-[#7ea8cc]"
              />
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#154064] px-5 text-sm font-semibold text-white hover:bg-[#103754]">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.95fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-1.5">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-xl font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{siteContent.footer.tagline}</p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"><Camera className="h-3.5 w-3.5" /> Photo hosting</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"><Video className="h-3.5 w-3.5" /> Video sharing</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"><Mail className="h-3.5 w-3.5" /> Creator support</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Platform</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {platformLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Resources</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Legal</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">{item.name}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((item) => (
                <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 bg-white/5 p-2.5 text-slate-300 hover:bg-white/10 hover:text-white">
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
