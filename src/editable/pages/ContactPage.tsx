'use client'

import { Camera, Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: Camera, title: 'Portfolio support', body: 'Ask about image posts, profile presentation, and visual showcase details.' },
    { icon: Sparkles, title: 'Creator collaborations', body: 'Share partnership ideas, category requests, or profile promotion needs.' },
    { icon: Mail, title: 'Publishing help', body: 'Get help with submissions, corrections, and public-facing profile information.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-white text-[#17104d]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-24 h-[430px] w-[430px] rounded-full bg-[#f2f6fb]" />
          <div className="mx-auto grid max-w-[1230px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8 lg:py-24">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{pagesContent.contact.eyebrow}</p>
              <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">Let us help you shape the right profile experience.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#8e8aa8]">Tell us what you are trying to publish, update, or promote. We will route your request to the right lane.</p>
              <div className="mt-8 grid gap-4">
                {lanes.map((lane) => (
                  <div key={lane.title} className="rounded-md border border-[#e6e4ed] bg-white p-5 shadow-[0_8px_26px_rgba(23,16,77,0.08)]">
                    <lane.icon className="h-6 w-6 text-[#ff2547]" />
                    <h2 className="mt-3 text-xl font-bold">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-[#8e8aa8]">{lane.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5 shadow-[0_14px_38px_rgba(23,16,77,0.08)]">
              <div className="rounded-md bg-[#251857] p-6 text-white">
                <MessageCircle className="h-10 w-10 text-[#ff2547]" />
                <h2 className="mt-4 text-3xl font-bold">{pagesContent.contact.formTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/65">Send the essentials and we will take it from there.</p>
              </div>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>

        <section className="bg-[#251857] py-12 text-white">
          <div className="mx-auto grid max-w-[1230px] gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              [Mail, 'Email-ready', 'Use the form for publishing and account questions.'],
              [Phone, 'Quick context', 'Include contact details if a follow-up is useful.'],
              [MapPin, 'Public details', 'Send location or category notes for profile pages.'],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-md border border-white/15 bg-white/5 p-5">
                <Icon className="h-6 w-6 text-[#ff2547]" />
                <h3 className="mt-3 text-xl font-bold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{text as string}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
