import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Image as ImageIcon, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}

const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}

const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden rounded-md border border-[#e6e4ed] bg-white shadow-[0_8px_26px_rgba(23,16,77,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,16,77,0.16)] ${strong ? 'md:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-[#eef6fb] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#251857]/72 via-[#251857]/5 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#251857]">{taskLabel}</span>
        </div>
      ) : (
        <div className="grid aspect-[16/10] place-items-center bg-[#f4f8fc]">
          <ImageIcon className="h-12 w-12 text-[#251857]" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#ff2547]">{taskLabel}</p>
        <h2 className="mt-3 line-clamp-3 text-2xl font-bold leading-tight text-[#17104d]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-[#8e8aa8]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#ff2547] opacity-80 group-hover:opacity-100">
          Open result <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[#17104d]">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-28 -top-32 h-[470px] w-[470px] rounded-full bg-[#f2f6fb]" />
          <div className="mx-auto max-w-[1230px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 rounded-md border border-[#e6e4ed] bg-white p-6 shadow-[0_14px_38px_rgba(23,16,77,0.08)] md:grid-cols-[0.82fr_1.18fr] lg:p-10">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{pagesContent.search.hero.badge}</p>
                <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Find images, profiles, and resources faster.</h1>
                <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-[#8e8aa8]">{pagesContent.search.hero.description}</p>
                <div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
                  <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5">
                    <p className="text-3xl font-black text-[#ff2547]">{results.length}</p>
                    <p className="mt-1 text-sm font-bold text-[#5f5b72]">Matching results</p>
                  </div>
                  <div className="rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-5">
                    <p className="text-3xl font-black text-[#251857]">{enabledTasks.length}</p>
                    <p className="mt-1 text-sm font-bold text-[#5f5b72]">Content types</p>
                  </div>
                </div>
              </div>

              <form action="/search" className="self-end rounded-md border border-[#e6e4ed] bg-[#f4f8fc] p-4 shadow-[0_8px_26px_rgba(23,16,77,0.08)] sm:p-5">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-md border border-[#e6e4ed] bg-white px-4 py-3">
                  <Search className="h-5 w-5 text-[#8e8aa8]" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold text-[#17104d] outline-none placeholder:text-[#aaa6bd]" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-md border border-[#e6e4ed] bg-white px-4 py-3">
                    <Filter className="h-4 w-4 text-[#8e8aa8]" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#17104d] outline-none placeholder:text-[#aaa6bd]" />
                  </label>
                  <select name="task" defaultValue={task} className="rounded-md border border-[#e6e4ed] bg-white px-4 py-3 text-sm font-black text-[#17104d] outline-none focus:border-[#ff2547]">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-md bg-[#ff2547] px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_22px_rgba(255,37,71,0.22)] transition hover:-translate-y-0.5" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">{results.length} results</p>
                <h2 className="mt-2 text-3xl font-bold text-[#17104d]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
              </div>
              <Link href="/image" className="inline-flex items-center gap-2 rounded-md border border-[#e6e4ed] bg-white px-5 py-3 text-sm font-black text-[#251857] transition hover:border-[#ff2547] hover:text-[#ff2547]">
                Browse latest <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {results.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            ) : (
              <div className="mt-8 rounded-md border border-dashed border-[#e6e4ed] bg-[#f4f8fc] p-10 text-center">
                <p className="text-2xl font-bold text-[#17104d]">No matching posts found.</p>
                <p className="mt-3 text-sm font-semibold text-[#8e8aa8]">Try a different keyword, task type, or category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
