import Link from 'next/link'
import { BookOpenCheck, Camera, Image as ImageIcon, Upload, UserRound, Video } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const guides = [
  {
    title: 'Start your first gallery',
    description: 'Create albums, upload covers, and arrange your media presentation.',
    icon: Upload,
  },
  {
    title: 'Improve image quality',
    description: 'Best practices for dimensions, compression, and visual clarity.',
    icon: ImageIcon,
  },
  {
    title: 'Video publishing basics',
    description: 'Upload clips, write descriptions, and optimize your video feed.',
    icon: Video,
  },
  {
    title: 'Creator profile setup',
    description: 'Customize your profile to showcase your style and media identity.',
    icon: UserRound,
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-[#ccdae7] bg-white p-8 shadow-[0_24px_60px_rgba(12,33,52,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#607486]">Help Centre</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Find answers for image and video publishing</h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#506270]">
              Learn how to publish better visuals, manage your creator space, and solve common workflow issues quickly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#133d5e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#10324d]">
                Contact support
              </Link>
              <Link href="/images" className="inline-flex items-center gap-2 rounded-full border border-[#c8d8e6] bg-[#f5f9fe] px-6 py-3 text-sm font-semibold text-[#233847] hover:bg-[#eaf3fb]">
                Browse image guides
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">Popular guides</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                  <article key={guide.title} className="rounded-[1.2rem] border border-[#d1dfea] bg-white p-5">
                    <guide.icon className="h-5 w-5 text-[#2b82c7]" />
                    <h3 className="mt-3 text-lg font-semibold">{guide.title}</h3>
                    <p className="mt-2 text-sm text-[#536573]">{guide.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-[#cfdeea] bg-white p-6">
              <h2 className="inline-flex items-center gap-2 text-3xl font-semibold tracking-[-0.04em]">
                <BookOpenCheck className="h-6 w-6 text-[#2b82c7]" />
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm text-[#556977]">Quick answers to common publishing, account, and creator profile topics.</p>
              <Accordion type="single" collapsible className="mt-5">
                {mockFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="rounded-[1.5rem] border border-[#cfddea] bg-[#f2f8ff] p-7">
              <p className="inline-flex items-center gap-2 text-2xl font-semibold">
                <Camera className="h-6 w-6 text-[#2b82c7]" />
                Need hands-on support?
              </p>
              <p className="mt-3 text-sm text-[#526573]">
                Our team can help with account setup, publishing strategy, and creator profile improvements.
              </p>
              <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#143c5d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f324e]">
                Open support request
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
