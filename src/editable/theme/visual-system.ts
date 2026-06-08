import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

const techimplyColors = {
  background: '#ffffff',
  foreground: '#17104d',
  muted: '#9d9ab5',
  primary: '#251857',
  accent: '#ff2547',
  surface: '#ffffff',
}

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'clean recommendation platform',
    fontDirection: 'modern sans with direct headlines',
    colors: techimplyColors,
    shape: 'white cards, red actions, deep-purple bands',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'premium directory',
    fontDirection: 'polished sans',
    colors: techimplyColors,
    shape: 'crisp panels with low radius',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'bold software index',
    fontDirection: 'large clear headings',
    colors: techimplyColors,
    shape: 'strong section color blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'friendly discovery',
    fontDirection: 'humanist sans',
    colors: techimplyColors,
    shape: 'quiet white surfaces',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'clean, fast, useful',
    fontDirection: 'modern sans with crisp navigation',
    colors: techimplyColors,
    shape: 'directory grids, pill filters, red CTAs',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'energetic platform',
    fontDirection: 'friendly heavy headings',
    colors: techimplyColors,
    shape: 'framed cards and dot accents',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'image-led profile discovery',
    fontDirection: 'minimal sans with strong section rhythm',
    colors: techimplyColors,
    shape: 'large media cards with white frames',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'tech-directory',
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.18em]',
    heroTitle: 'text-4xl font-bold tracking-[0] sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-bold tracking-[0] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-semibold uppercase tracking-[0.16em]',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/10 backdrop-blur-xl',
    paper: 'border border-[#e6e4ed] bg-white shadow-[0_14px_42px_rgba(23,16,77,0.08)]',
    quiet: 'border border-[#e6e4ed] bg-[#f4f8fc]',
    dark: 'border border-white/10 bg-[#251857] shadow-[0_20px_70px_rgba(37,24,87,0.24)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
