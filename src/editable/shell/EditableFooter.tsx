'use client'

import Link from 'next/link'

export function EditableFooter() {
  const links = [
    ['Home', '/'],
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Sign in', '/login'],
    ['Sign up', '/signup'],
  ] as const

  return (
    <footer className="bg-[#251857] px-4 py-10 text-white">
      <nav className="mx-auto flex max-w-[1230px] flex-wrap items-center justify-center gap-x-10 gap-y-4" aria-label="Footer">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="text-base font-bold transition hover:text-[#ff2547]">
            {label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
