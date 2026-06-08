import type { Metadata } from 'next'
import Link from 'next/link'
import { Rocket, Sparkles, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white text-[#17104d]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1230px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5 shadow-[0_14px_38px_rgba(23,16,77,0.08)]">
            <div className="rounded-md bg-[#251857] p-6 text-white">
              <UserPlus className="h-10 w-10 text-[#ff2547]" />
              <h1 className="mt-4 text-3xl font-bold">{pagesContent.auth.signup.formTitle}</h1>
              <p className="mt-2 text-sm text-white/65">Create access for profile submissions and publishing tools.</p>
            </div>
            <div className="mt-5 rounded-md bg-white p-6">
              <EditableLocalSignupForm />
              <p className="mt-5 text-sm text-[#8e8aa8]">Already have an account? <Link href="/login" className="font-black text-[#ff2547] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">Create your account and get listed faster.</h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#8e8aa8]">{pagesContent.auth.signup.description}</p>
            <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-[#e6e4ed] bg-white p-5 shadow-[0_8px_26px_rgba(23,16,77,0.08)]">
                <Rocket className="h-7 w-7 text-[#ff2547]" />
                <p className="mt-3 text-sm font-bold">Start with the essentials and publish cleanly.</p>
              </div>
              <div className="rounded-md border border-[#e6e4ed] bg-white p-5 shadow-[0_8px_26px_rgba(23,16,77,0.08)]">
                <Sparkles className="h-7 w-7 text-[#ff2547]" />
                <p className="mt-3 text-sm font-bold">Match the visual profile style across the site.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
