import type { Metadata } from 'next'
import Link from 'next/link'
import { LogIn, ShieldCheck, UserRound } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#17104d]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1230px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">Sign in to your visual profile space.</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#8e8aa8]">{pagesContent.auth.login.description}</p>
            <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5">
                <UserRound className="h-7 w-7 text-[#ff2547]" />
                <p className="mt-3 text-sm font-bold">Manage saved access and submissions.</p>
              </div>
              <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5">
                <ShieldCheck className="h-7 w-7 text-[#ff2547]" />
                <p className="mt-3 text-sm font-bold">Keep profile work moving from one place.</p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5 shadow-[0_14px_38px_rgba(23,16,77,0.08)]">
            <div className="rounded-md bg-[#251857] p-6 text-white">
              <LogIn className="h-10 w-10 text-[#ff2547]" />
              <h2 className="mt-4 text-3xl font-bold">{pagesContent.auth.login.formTitle}</h2>
              <p className="mt-2 text-sm text-white/65">Continue to your account.</p>
            </div>
            <div className="mt-5 rounded-md bg-white p-6">
              <EditableLocalLoginForm />
              <p className="mt-5 text-sm text-[#8e8aa8]">New here? <Link href="/signup" className="font-black text-[#ff2547] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
