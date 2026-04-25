import { Activity, CircleCheckBig, Clock3, Server, Zap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const services = [
  { name: 'Web Platform', status: 'Operational', latency: '120ms', uptime: '99.98%' },
  { name: 'Media Upload API', status: 'Operational', latency: '170ms', uptime: '99.95%' },
  { name: 'Image Delivery CDN', status: 'Operational', latency: '95ms', uptime: '99.99%' },
]

const incidents = [
  { date: 'April 18, 2026', title: 'Temporary image processing queue delay', status: 'Resolved in 22 min' },
  { date: 'April 02, 2026', title: 'Search indexing slowdown', status: 'Resolved in 41 min' },
  { date: 'March 27, 2026', title: 'Short API timeout spike', status: 'Resolved in 13 min' },
]

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#ccdbe7] bg-white p-8 shadow-[0_22px_56px_rgba(10,33,51,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#627788]">System Status</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Live service health and uptime</h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#506270]">
            Track platform availability, API health, and media delivery performance in one place.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#cae1f4] bg-[#e8f5ff] px-4 py-2 text-sm font-semibold text-[#185a8f]">
            <CircleCheckBig className="h-4 w-4" />
            All systems operational
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.name} className="rounded-[1.2rem] border border-[#cfdeea] bg-white p-6">
              <Server className="h-5 w-5 text-[#2b82c7]" />
              <h2 className="mt-3 text-xl font-semibold">{service.name}</h2>
              <p className="mt-2 text-sm font-medium text-[#1f7b3f]">{service.status}</p>
              <div className="mt-4 space-y-1 text-sm text-[#536573]">
                <p className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-[#2b82c7]" />Latency: {service.latency}</p>
                <p className="inline-flex items-center gap-2"><Activity className="h-4 w-4 text-[#2b82c7]" />Uptime: {service.uptime}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[1.6rem] border border-[#cedde9] bg-white p-7">
          <h2 className="text-2xl font-semibold">Recent incidents</h2>
          <div className="mt-5 space-y-3">
            {incidents.map((incident) => (
              <article key={incident.title} className="rounded-xl border border-[#d2e0eb] bg-[#f4f9ff] px-4 py-3">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#64798a]">
                  <Clock3 className="h-3.5 w-3.5" />
                  {incident.date}
                </p>
                <p className="mt-1 text-sm font-semibold">{incident.title}</p>
                <p className="text-sm text-[#536573]">{incident.status}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
