import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { ArticleListCard, CompactIndexCard, EditorialFeatureCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref, ProfileMiniCard, RailPostCard } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...single].slice(0, 8)
}
const getImage = (post: SitePost) => getImages(post)[0] || getEditablePostImage(post)
const getSummary = (post: SitePost) => getEditableExcerpt(post, 190)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-6 lg:grid-cols-[1fr_1fr]', promise: 'Editorial reading cards with strong image, headline, and excerpt hierarchy.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory rows highlight company identity, location, contact context, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing for portfolios, image posts, and visual showcases.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#ffffff', '--archive-text': '#17104d', '--archive-surface': '#f4f8fc', '--archive-accent': '#ff2547', '--editable-border': '#e6e4ed' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts[0]

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[1230px] gap-9 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0f3] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]"><Icon className="h-4 w-4" /> {label}</div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#8e8aa8]">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-6 rounded-md border border-[var(--editable-border)] bg-[var(--archive-surface)] p-4 text-sm font-semibold leading-7 text-[#5c5871]">{deck.promise}</div>
          </div>

          <form action={basePath} className="self-end rounded-md border border-[var(--editable-border)] bg-white p-5 shadow-[0_8px_26px_rgba(23,16,77,0.08)]">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#8e8aa8]"><Filter className="h-4 w-4" /> Filter</div>
            <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-md border border-[var(--editable-border)] bg-white px-4 text-sm font-bold outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full rounded-md bg-[#ff2547] text-sm font-black text-white">Apply</button>
            <p className="mt-3 text-xs font-bold text-[#8e8aa8]">Showing: {categoryLabel}</p>
          </form>
        </section>

        {featured ? (
          <section className="mx-auto max-w-[1230px] px-4 pb-10 sm:px-6 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <EditorialFeatureCard post={featured} href={postHref(task, featured, basePath)} label={`${deck.badge} spotlight`} />
              <div className="grid gap-5">
                {posts.slice(1, 4).map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={index} />)}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-[1230px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <>
              {task === 'image' ? <div className={deck.archiveClass}>{posts.map((post, index) => <ImageArchiveCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={index} />)}</div> : null}
              {task === 'profile' ? <div className={deck.archiveClass}>{posts.map((post) => <ProfileMiniCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} />)}</div> : null}
              {task !== 'image' && task !== 'profile' ? <div className={deck.archiveClass}>{posts.slice(4).map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}</div> : null}
            </>
          ) : (
            <div className="rounded-md border border-dashed border-[var(--editable-border)] bg-white p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[#8e8aa8]" />
              <h2 className="mt-4 text-3xl font-bold">No posts found</h2>
              <p className="mt-2 text-sm text-[#8e8aa8]">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          {posts.length > 6 ? (
            <div className="mt-12">
              <h2 className="mb-5 text-2xl font-bold">More from this section</h2>
              <div className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {posts.slice(6, 12).map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={index} />)}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-md border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-md bg-[#251857] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-md border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  return <CompactIndexCard post={post} href={href} index={index} />
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-md border border-[#e6e4ed] bg-white p-5 shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1 sm:grid-cols-[120px_1fr]">
      <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-md bg-[#f4f8fc]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-[#251857]" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#251857] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[#e6e4ed] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#8e8aa8]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[#8e8aa8] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group overflow-hidden rounded-md border border-[#e6e4ed] bg-white shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[#251857] p-5 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Classified</span>
          <h2 className="mt-10 text-3xl font-bold leading-tight">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/70">{location || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-md object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold leading-tight">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#8e8aa8]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#ff2547]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-md border border-[#e6e4ed] bg-white shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0f3] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#ff2547]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-bold leading-tight">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#8e8aa8]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-md border border-[#e6e4ed] bg-white p-6 shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1 hover:bg-[#251857] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-tight">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.14em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-md border border-[#e6e4ed] bg-white p-6 shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-md bg-[#251857] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[#fff0f3] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#ff2547]">{getEditableCategory(post)}</span>
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-tight">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#8e8aa8]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#ff2547]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}
