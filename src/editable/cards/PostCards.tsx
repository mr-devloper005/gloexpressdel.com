import Link from 'next/link'
import { ArrowRight, Clock3, Image as ImageIcon, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const placeholder = '/placeholder.svg?height=900&width=1400'

function isUrl(value: string) {
  return value.startsWith('/') || /^https?:\/\//i.test(value)
}

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url && isUrl(item.url))?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url) && isUrl(url))
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => content[key]).find((url): url is string => typeof url === 'string' && Boolean(url) && isUrl(url))
  return mediaUrl || contentImage || single || placeholder
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured profile' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-md border border-[#dddbe6] bg-white shadow-[0_12px_34px_rgba(23,16,77,0.10)] transition hover:-translate-y-1">
      <div className="relative min-h-[460px] p-6">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,16,77,0.04),rgba(23,16,77,0.78))]" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end text-white">
          <span className="w-fit rounded-full bg-[#ff2547] px-4 py-2 text-xs font-black uppercase tracking-[0.14em]">{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-bold leading-tight">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#251857]">
            Read More <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block w-[330px] shrink-0 overflow-hidden rounded-md border border-[#dddbe6] bg-white shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1">
      <div className="relative aspect-[16/8] bg-[#eef6fb]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#251857]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#ff2547]">{getEditableCategory(post)}</p>
        <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-tight text-[#17104d]">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#8e8aa8]">{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block min-w-0 rounded-md border border-[#dddbe6] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(23,16,77,0.12)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#251857] text-xs font-black text-white">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff2547]"><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-tight text-[#17104d]">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#8e8aa8]">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const imageFirst = index % 3 === 0
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden rounded-md border border-[#dddbe6] bg-white p-4 shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1 sm:grid-cols-[220px_minmax(0,1fr)] ${imageFirst ? 'lg:grid-cols-[300px_minmax(0,1fr)]' : ''}`}>
      <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-[#eef6fb] sm:aspect-auto sm:min-h-[190px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {imageFirst ? <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase text-[#251857]"><ImageIcon className="h-3 w-3" /> Visual</span> : null}
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#ff2547]">{index % 2 ? 'Editorial list' : 'Featured row'}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-bold leading-tight text-[#17104d] sm:text-3xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#8e8aa8]">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#251857]">Open profile <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function ProfileMiniCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="rounded-md border border-[#dddbe6] bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(23,16,77,0.12)]">
      <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-[#eef6fb]">
        {getEditablePostImage(post) !== placeholder ? <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[#251857]" />}
      </div>
      <h3 className="mt-4 line-clamp-2 text-lg font-bold text-[#17104d]">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-[#8e8aa8]">{getEditableExcerpt(post, 80)}</p>
    </Link>
  )
}
