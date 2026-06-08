'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

function LogoMark() {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-[#e6e4ed]">
        <picture>
          <source srcSet="/favicon.ico" type="image/x-icon" />
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-11 w-11 object-contain" />
        </picture>
      </span>
      <span className="leading-none">
        <span className="block text-[25px] font-black uppercase tracking-[0.04em] text-[#251857]">
          GLO<span className="text-[#ff2547]">EXPRESS</span>
        </span>
        <span className="block text-[7px] font-bold uppercase tracking-[0.05em] text-[#17104d]"></span>
      </span>
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = { '--editable-border': '#e8e7ef', '--editable-container': '1230px' } as CSSProperties
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const primaryTask = navItems[0] || { label: 'Profiles', href: '/profile' }

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white text-[#17104d] shadow-[0_2px_10px_rgba(23,16,77,0.06)]">
      <nav className="mx-auto flex min-h-[62px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label={`${SITE_CONFIG.name} home`}>
          <LogoMark />
        </Link>

        <div className="ml-auto hidden items-center gap-9 lg:flex">
          <Link href={primaryTask.href} className="text-[17px] font-medium hover:text-[#ff2547]">
            Image
          </Link>
          <Link href="/about" className="text-[17px] font-medium hover:text-[#ff2547]">About</Link>
          <Link href="/contact" className="text-[17px] font-medium hover:text-[#ff2547]">Contact</Link>
          <Link href="/search" className="rounded-full p-2 hover:bg-[#f4f8fc]" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          {session ? (
            <button type="button" onClick={logout} className="text-[16px] font-bold hover:text-[#ff2547]">Logout</button>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 text-[16px] font-bold hover:text-[#ff2547]"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="text-[16px] font-bold hover:text-[#ff2547]">Signup</Link>
            </>
          )}
          
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-md border border-[var(--editable-border)] p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mx-auto mb-3 flex max-w-[var(--editable-container)] rounded-md border border-[var(--editable-border)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search profiles or visuals" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-2">
            {[{ label: 'Home', href: '/' }, primaryTask, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Signup', href: '/signup' }, { label: 'Get listed', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-md border border-[var(--editable-border)] px-4 py-3 text-sm font-bold ${active ? 'bg-[#251857] text-white' : 'bg-white'}`}>
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </header>
  )
}
