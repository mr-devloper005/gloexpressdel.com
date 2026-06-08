import Link from 'next/link'
import { Camera, CheckCircle2, Image as ImageIcon, Search, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const values = [
    ['Image-first discovery', 'Portfolio visuals, profile details, and public content are arranged so visitors can scan quickly.', Camera],
    ['Clear profile context', 'Profiles keep names, summaries, categories, and supporting links easy to understand.', UserRound],
    ['Fast search rhythm', 'Simple navigation and direct page structure help people move from interest to action.', Search],
  ] as const

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#17104d]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-28 h-[430px] w-[430px] rounded-full bg-[#f2f6fb]" />
          <div className="mx-auto grid max-w-[1230px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
            <article>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#8e8aa8]">{pagesContent.about.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/image" className="rounded-md bg-[#ff2547] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(255,37,71,0.22)]">Explore images</Link>
                <Link href="/contact" className="rounded-md border border-[#e6e4ed] bg-white px-7 py-3 text-sm font-bold text-[#251857]">Contact</Link>
              </div>
            </article>

            <aside className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-6 shadow-[0_14px_38px_rgba(23,16,77,0.08)]">
              <div className="rounded-md bg-[#251857] p-7 text-white">
                <ImageIcon className="h-12 w-12 text-[#ff2547]" />
                <h2 className="mt-5 text-3xl font-bold">Built for visual profiles</h2>
                <p className="mt-4 leading-7 text-white/70">A public browsing experience for creative work, portfolio pages, and professional discovery.</p>
              </div>
              <div className="mt-4 grid gap-3">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="rounded-md bg-white p-4 text-sm leading-7 text-[#5f5b72]">{paragraph}</p>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-[#251857] py-16 text-white">
          <div className="mx-auto grid max-w-[1230px] gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {values.map(([title, description, Icon]) => (
              <div key={title} className="rounded-md border border-white/15 bg-white/5 p-6">
                <Icon className="h-10 w-10 text-[#ff2547]" />
                <h2 className="mt-5 text-2xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-md border border-[#e6e4ed] bg-white p-6 shadow-[0_8px_26px_rgba(23,16,77,0.08)]">
                  <CheckCircle2 className="h-7 w-7 text-[#ff2547]" />
                  <h2 className="mt-4 text-xl font-bold">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#8e8aa8]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
