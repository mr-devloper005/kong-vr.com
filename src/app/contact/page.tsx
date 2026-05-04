import { Clock3, Mail, MapPin, MessageSquare, Phone, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  `support@${SITE_CONFIG.domain.replace(/^www\./, '')}`

const supportLanes = [
  {
    title: 'Creator onboarding',
    description: 'Need help setting up albums, profile visuals, or publishing flow? Start here.',
    icon: MessageSquare,
  },
  {
    title: 'Technical assistance',
    description: 'Upload issues, media rendering questions, and workspace troubleshooting.',
    icon: ShieldCheck,
  },
  {
    title: 'Partnership and media',
    description: 'Campaign collaborations, featured creator requests, and publishing partnerships.',
    icon: Mail,
  },
]

const contactCards = [
  { label: 'Support Email', value: contactEmail, icon: Mail },
  { label: 'Phone', value: '+1 (800) 555-0193', icon: Phone },
  { label: 'Location', value: 'Creator Support Desk, Global Remote Team', icon: MapPin },
  { label: 'Hours', value: 'Mon - Fri, 09:00 AM to 07:00 PM', icon: Clock3 },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#627788]">Contact Us</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Let's get your media project moving</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#506271]">
              Tell us what you are trying to create on {SITE_CONFIG.name}. We'll route your request to the right support lane and reply with clear next steps.
            </p>
            <div className="mt-8 grid gap-4">
              {supportLanes.map((lane) => (
                <article key={lane.title} className="rounded-[1.3rem] border border-[#d0deea] bg-white p-5">
                  <lane.icon className="h-5 w-5 text-[#2a82c6]" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm text-[#536573]">{lane.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <form className="rounded-[1.8rem] border border-[#cdddea] bg-white p-7 shadow-[0_22px_55px_rgba(14,35,54,0.08)]">
              <h2 className="text-2xl font-semibold">Send us a message</h2>
              <p className="mt-2 text-sm text-[#5a6d7a]">We usually respond within one business day.</p>
              <div className="mt-6 grid gap-4">
                <input className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#85adcf]" placeholder="Your name" />
                <input className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#85adcf]" placeholder="Email address" />
                <input className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#85adcf]" placeholder="Subject" />
                <textarea className="min-h-[160px] rounded-2xl border border-[#d0deea] bg-[#f8fbff] px-4 py-3 text-sm outline-none transition focus:border-[#85adcf]" placeholder="Share your message..." />
                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="inline-flex h-12 items-center justify-center rounded-full bg-[#143c5d] px-6 text-sm font-semibold text-white hover:bg-[#0f314d]">
                    Send Message
                  </button>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#c8d8e5] bg-[#f7fbff] px-6 text-sm font-semibold text-[#143c5d] hover:bg-[#eef6ff]"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </form>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactCards.map((card) => (
                <article key={card.label} className="rounded-xl border border-[#cfdcea] bg-[#f4f9ff] p-4">
                  <card.icon className="h-4 w-4 text-[#2a82c6]" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#627788]">{card.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#223441]">{card.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
