import Link from 'next/link'
import { FileText, Handshake, Shield } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Account responsibilities',
    body: 'Keep your account credentials secure and provide accurate profile information.',
    icon: Shield,
  },
  {
    title: 'Content rights',
    body: 'You retain ownership of your uploads and grant display rights needed for platform operation.',
    icon: FileText,
  },
  {
    title: 'Community conduct',
    body: 'Abusive, illegal, or misleading activity is not allowed and may result in account action.',
    icon: Handshake,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#ccdbe7] bg-white p-8 shadow-[0_22px_56px_rgba(10,33,51,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#627788]">Terms of Service</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Guidelines for using {SITE_CONFIG.name}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#506270]">
            These terms outline how to use the platform responsibly and what to expect from our services.
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
          <h2 className="text-2xl font-semibold">Questions about these terms?</h2>
          <p className="mt-3 text-sm leading-7 text-[#526472]">
            Reach out to our support team for clarifications before publishing or scaling your media operations.
          </p>
          <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#143d5f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f324f]">
            Contact support
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
