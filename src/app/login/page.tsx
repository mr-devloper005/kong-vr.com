'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { useAuth } from '@/lib/auth-context'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.')
      return
    }

    try {
      await login(email.trim(), password)
      router.push('/')
    } catch {
      setError('Unable to sign in right now. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#edf2f6] text-[#13232f]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[2rem] border border-[#cddae6] bg-white shadow-[0_28px_70px_rgba(15,35,52,0.10)]">
            <div className="relative h-56">
              <ContentImage
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
                alt="Media platform background"
                fill
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,43,0.15)_0%,rgba(10,25,43,0.56)_100%)]" />
              <p className="absolute bottom-5 left-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">Image-first creator platform</p>
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[#13232f]">Welcome back to your gallery workspace</h1>
              <p className="mt-5 text-sm leading-8 text-[#536270]">
                Login to publish photos, manage albums, and keep your media collections online with a clean visual flow.
              </p>
              <div className="mt-8 grid gap-4">
                {['Fast upload and media sorting', 'Creator profile with image highlights', 'Saved local session for quick return'].map((item) => (
                  <div key={item} className="rounded-[1rem] border border-[#d9e3ec] bg-[#f8fbff] px-4 py-4 text-sm text-[#233645]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#cddae6] bg-white p-8 shadow-[0_28px_70px_rgba(15,35,52,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5c6e7e]">Sign in</p>
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <input
                className="h-12 rounded-xl border border-[#d1dde9] bg-[#f9fcff] px-4 text-sm outline-none transition focus:border-[#81abd0]"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="h-12 rounded-xl border border-[#d1dde9] bg-[#f9fcff] px-4 text-sm outline-none transition focus:border-[#81abd0]"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error ? (
                <p className="text-sm text-[#a71d2a]">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#133450] px-6 text-sm font-semibold text-white transition hover:bg-[#0e273d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between text-sm text-[#536270]">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
