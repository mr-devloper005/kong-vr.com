'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Sparkles, UserRoundPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { useAuth } from '@/lib/auth-context'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focusArea, setFocusArea] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please complete name, email, and password.')
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
    } catch {
      setError('Unable to create account right now. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#ecf2f7] text-[#15232e]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#cbdae7] bg-white shadow-[0_26px_65px_rgba(12,35,53,0.09)]">
            <div className="relative h-56">
              <ContentImage
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80"
                alt="Create account background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,24,40,0.18)_0%,rgba(9,24,40,0.58)_100%)]" />
              <p className="absolute bottom-5 left-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">Create your creator workspace</p>
            </div>

            <div className="p-8">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#5f7283]">
                <UserRoundPlus className="h-4 w-4 text-[#2b82c7]" />
                Create account
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Start publishing your visual stories</h1>
              <p className="mt-5 text-sm leading-8 text-[#536573]">
                Join creators who share photography and video in a cleaner, image-first platform built for discoverability.
              </p>
              <div className="mt-7 grid gap-3">
                {['Create your profile in minutes', 'Upload albums and videos with ease', 'Manage media from one unified dashboard'].map((item) => (
                  <div key={item} className="rounded-xl border border-[#d4e2ed] bg-[#f6fbff] px-4 py-3 text-sm text-[#223542]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#cbdae7] bg-white p-8 shadow-[0_26px_65px_rgba(12,35,53,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#607486]">Register</p>
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <input
                className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#84adcf]"
                placeholder="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="email"
                className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#84adcf]"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#84adcf]"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                className="h-12 rounded-xl border border-[#d0deea] bg-[#f8fbff] px-4 text-sm outline-none transition focus:border-[#84adcf]"
                placeholder="What are you creating?"
                value={focusArea}
                onChange={(event) => setFocusArea(event.target.value)}
              />
              {error ? <p className="text-sm text-[#a71d2a]">{error}</p> : null}
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#143d5f] px-6 text-sm font-semibold text-white transition hover:bg-[#0f324e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-[#546876]">
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
