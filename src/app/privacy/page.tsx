import Link from 'next/link'
import { Eye, Lock, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const sections = [
  {
    title: 'Information we collect',
    body: 'We collect account details, profile information, and media activity required to operate your creator workspace.',
    icon: Eye,
  },
  {
    title: 'How data is used',
    body: 'Your data helps personalize feeds, improve media discovery, prevent abuse, and keep platform services stable.',
    icon: ShieldCheck,
  },
  {
    title: 'Security and retention',
    body: 'We apply practical safeguards, minimize retention windows, and allow account-level deletion controls when available.',
    icon: Lock,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#ccdbe7] bg-white p-8 shadow-[0_22px_56px_rgba(10,33,51,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#627788]">Privacy Policy</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">How we protect your data and media activity</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#506270]">
            We are committed to transparent data handling for creators and visitors using this platform.
          </p>
          <p className="mt-3 text-xs text-[#6a7f90]">Last updated: April 24, 2026</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.2rem] border border-[#cfdeea] bg-white p-6">
              <section.icon className="h-5 w-5 text-[#2b82c7]" />
              <h2 className="mt-3 text-xl font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#536573]">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[1.6rem] border border-[#cedde9] bg-[#f4f9ff] p-7">
          <h2 className="text-2xl font-semibold">Your controls</h2>
          <p className="mt-3 text-sm leading-7 text-[#526472]">
            You can request updates, exports, or deletion support through our contact page.
          </p>
          <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#143d5f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f324f]">
            Contact privacy support
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
