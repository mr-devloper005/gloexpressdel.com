import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#17104d',
  '--slot4-panel-bg': '#f4f8fc',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#8e8aa8',
  '--slot4-soft-muted-text': '#a6a2bb',
  '--slot4-accent': '#ff2547',
  '--slot4-accent-fill': '#ff2547',
  '--slot4-accent-soft': '#fff0f3',
  '--slot4-dark-bg': '#251857',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eef6fb',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7fbff',
  '--slot4-lavender': '#251857',
  '--slot4-gray': '#f4f8fc',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #ffffff 46%, #f4f8fc 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#e6e4ed]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_10px_34px_rgba(23,16,77,0.08)]',
  shadowStrong: 'shadow-[0_18px_60px_rgba(23,16,77,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(23,16,77,0.02),rgba(23,16,77,0.68))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1230px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[330px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.14em]',
    heroTitle: 'text-3xl font-semibold leading-[1.42] tracking-[0] sm:text-4xl lg:text-[2.45rem]',
    sectionTitle: 'text-3xl font-bold tracking-[0] sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-md ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-md ${editablePalette.accentBg} px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,37,71,0.28)]`,
    secondary: `inline-flex items-center justify-center rounded-md border ${editablePalette.border} ${editablePalette.surfaceBg} px-7 py-3 text-sm font-bold ${editablePalette.surfaceText} transition hover:border-[var(--slot4-accent-fill)] hover:text-[var(--slot4-accent-fill)]`,
    accent: `inline-flex items-center justify-center rounded-md ${editablePalette.accentBg} px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5`,
  },
  media: {
    frame: `relative overflow-hidden rounded-md ${editablePalette.mediaBg}`,
    ratio: 'aspect-[16/8]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,16,77,0.16)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep the Techimply-inspired white, red, and deep-purple system in editableRootStyle.',
  'Homepage sections live in src/editable/sections/HomeSections.tsx and consume live post props.',
  'Render images, summaries, and categories with fallbacks because imported posts can be sparse.',
  'Use varied card formats across rails, grids, lists, galleries, and profile blocks.',
  'Keep postHref() for all post links so every supported task route remains intact.',
] as const
