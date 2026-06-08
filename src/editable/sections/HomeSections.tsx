import Link from 'next/link'
import { Bot, BriefcaseBusiness, Camera, Check, ClipboardList, Code2, FileText, Image as ImageIcon, Megaphone, PenLine, Rocket, Search, ShieldCheck, ShoppingCart, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const categories = [
  ['Artificial Intelligence', Bot],
  ['E-commerce Platforms', ShoppingCart],
  ['Portfolio Design', Code2],
  ['Help Desk Profiles', UserRound],
  ['Creative Services', BriefcaseBusiness],
  ['Live Chat Studios', Megaphone],
  ['Photography', Camera],
  ['Image Editing', ImageIcon],
  ['Brand Identity', PenLine],
  ['PDF Resources', FileText],
]

const clients = ['keka', 'greytHR', 'SPINE HR Suite', 'HubSpot', 'darwinbox']

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function imageFor(post?: SitePost | null) {
  return getEditablePostImage(post)
}

function searchPlaceholder(primaryTask: TaskKey) {
  return `Search ${taskLabel(primaryTask)}s or Companies`
}

function HeroIllustration({ post }: { post?: SitePost }) {
  return (
    <div className="relative mx-auto h-[360px] max-w-[560px] sm:h-[430px]">
      <div className="absolute -right-12 -top-20 h-[470px] w-[470px] rounded-full bg-[#f2f6fb]" />
      <div className="absolute bottom-10 left-4 right-4 h-1 rounded-full bg-[#251857]" />
      <div className="absolute bottom-20 left-[18%] h-56 w-72 rounded-t-xl border-[5px] border-[#251857] bg-[#dff6ff] shadow-[inset_0_0_0_8px_rgba(255,255,255,0.85)]">
        <div className="m-7 grid grid-cols-[0.8fr_1fr] gap-4">
          <div className="rounded-full border-[14px] border-[#92d4ef] border-r-transparent bg-white" />
          <div className="space-y-3">
            <div className="h-20 rounded-xl bg-white/80">
              {post ? <img src={imageFor(post)} alt="" className="h-full w-full rounded-xl object-cover opacity-80" /> : null}
            </div>
            <div className="h-3 rounded-full bg-white" />
            <div className="h-3 w-3/4 rounded-full bg-white" />
          </div>
        </div>
        <div className="absolute -bottom-16 left-1/2 h-16 w-20 -translate-x-1/2 border-x-[5px] border-[#251857] bg-[#c6eefa]" />
      </div>
      <div className="absolute bottom-20 right-4 h-28 w-40 rounded-xl border-[5px] border-[#251857] bg-[#dff6ff] p-3">
        <div className="grid h-full place-items-center rounded bg-white/60 text-[#251857]"><ImageIcon className="h-9 w-9" /></div>
      </div>
      <div className="absolute bottom-20 left-4 h-32 w-20 rounded-lg border-[4px] border-[#251857] bg-[#dff6ff] p-2">
        <div className="h-4 rounded bg-white" />
        <div className="mt-3 grid h-20 grid-cols-3 items-end gap-1">
          <span className="h-8 bg-[#92d4ef]" /><span className="h-14 bg-[#92d4ef]" /><span className="h-10 bg-[#92d4ef]" />
        </div>
      </div>
      <div className="absolute right-[18%] top-12 grid h-28 w-28 place-items-center rounded-full border-[4px] border-[#251857] bg-[#dff6ff]">
        <div className="grid h-16 w-16 place-items-center rounded-full border-[4px] border-[#251857] bg-white"><ShieldCheck className="h-7 w-7" /></div>
      </div>
      <Search className="absolute left-8 top-24 h-11 w-11 text-[#251857]" />
    </div>
  )
}

function AdCard({ post, index }: { post?: SitePost; index: number }) {
  const palettes = [
    ['#eff9ff', '#2449d8', '#f5d934'],
    ['#fff8f2', '#ff743d', '#251857'],
    ['#ecfff3', '#00c853', '#111111'],
    ['#fff8fb', '#ff2547', '#17104d'],
    ['#ecfff2', '#157a37', '#ffffff'],
    ['#f5f2ff', '#8d43ff', '#17104d'],
  ]
  const [bg, accent, text] = palettes[index % palettes.length]
  return (
    <Link href={post ? postHref((SITE_CONFIG.tasks.find((task) => task.enabled)?.key || 'article') as TaskKey, post, SITE_CONFIG.taskViews[(SITE_CONFIG.tasks.find((task) => task.enabled)?.key || 'article') as TaskKey] || '/article') : '/search'} className="group min-h-[178px] overflow-hidden rounded-md border border-[#dddbe6] bg-white shadow-[0_2px_10px_rgba(23,16,77,0.16)] transition hover:-translate-y-1">
      <div className="relative h-full min-h-[178px] p-5" style={{ background: bg, color: text }}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rotate-45" style={{ background: accent, opacity: 0.85 }} />
        {post ? <img src={imageFor(post)} alt="" className="absolute bottom-0 right-0 h-full w-44 object-cover opacity-75 mix-blend-multiply" /> : null}
        <div className="relative max-w-[72%]">
          <p className="text-xs font-black uppercase">{getEditableCategory(post)}</p>
          <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight">{post?.title || 'Run your business from your mobile portfolio.'}</h3>
          <p className="mt-2 line-clamp-2 text-xs font-semibold opacity-75">{getEditableExcerpt(post, 90) || 'Find profiles, images, and useful details in one place.'}</p>
          <span className="mt-4 inline-flex rounded-full px-4 py-2 text-[11px] font-black text-white" style={{ background: accent }}>GET STARTED</span>
        </div>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, posts }: HomeSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute left-0 top-64 text-[520px] font-black leading-none text-[#f4f8fc]">i</div>
      <div className="mx-auto grid max-w-[1230px] gap-10 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div>
          <h1 className={`${dc.type.heroTitle} max-w-[660px] text-[#17104d]`}>
            Find The Most Suitable <span className="font-black text-[#ff2547]">Creative</span> For Your Business Needs
          </h1>
          <form action="/search" className="mt-8 flex max-w-[600px] items-center rounded-full border border-[#e0dee8] bg-white px-5 py-4 shadow-[0_18px_38px_rgba(23,16,77,0.10)]">
            <input name="q" type="search" placeholder={searchPlaceholder(primaryTask)} className="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-[#5c5871]" />
            <button className="grid h-10 w-10 place-items-center rounded-full text-[#251857]" aria-label="Search"><Search className="h-5 w-5" /></button>
          </form>
        </div>
        <HeroIllustration post={posts[0]} />
      </div>
      <div className="mx-auto grid max-w-[1230px] gap-7 px-4 pb-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 6 }).map((_, index) => <AdCard key={index} post={posts[index]} index={index} />)}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#251857] py-20 text-white">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[520px] w-[520px] opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
      <div className="mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Recommendations of Top Creative their Services</h2>
          <p className="mt-3 text-lg text-white/55">Discover image-led portfolios, useful, and service providers with clear public details.</p>
        </div>
        <div className="mt-9 border-b border-white/15">
          <div className="flex gap-10 text-xl font-semibold">
            <span className="pb-4">Service Categories</span>
          </div>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.slice(0, 12).map(([label, Icon]) => (
            <Link key={label as string} href={primaryRoute} className="group text-center">
              <span className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-white text-[#251857] transition group-hover:-translate-y-1 group-hover:text-[#ff2547]">
                <Icon className="h-11 w-11" />
              </span>
              <span className="mx-auto mt-5 block max-w-[150px] text-xl font-medium leading-snug">{label as string}</span>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href={primaryRoute} className="inline-flex rounded-md border border-white px-8 py-3 text-base font-bold transition hover:bg-white hover:text-[#251857]">
            Browse all category
          </Link>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ posts }: HomeSectionProps) {
  return (
    <>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1230px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xl text-[#aaa6bd]">Why Businesses</p>
            <h2 className="mt-1 text-4xl font-bold text-[#17104d]">Trust GloExpress</h2>
            <div className="mt-4 h-0.5 w-10 bg-[#ff2547]" />
            <div className="mt-10 max-w-[360px]">
              <HeroIllustration post={posts[1]} />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-5">
              <div className="rounded-md bg-[#fff0f3] px-6 py-5"><strong className="block text-3xl text-[#ff2547]">10K+</strong><span>Visuals</span></div>
              <div className="rounded-md bg-[#f0f0f5] px-6 py-5"><strong className="block text-3xl text-[#17104d]">50K+</strong><span>Happy Visitors</span></div>
            </div>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-black">We are growing every day with listing categories, visual showcases, and profile pages that help people compare creative work with less friction.</p>
            <div className="mt-8 border-t border-[#e5e3ec] pt-7">
              {[
                'A clean discovery surface for profiles, portfolios, images, and service details.',
                'Image-first browsing helps visitors understand style and capability quickly.',
                'Structured pages keep contact details, summaries, and galleries easy to scan.',
                'Every route keeps its original post data and supported publishing flow.',
                'Search, categories, pagination, and related content are designed for repeat browsing.',
              ].map((item) => (
                <p key={item} className="mt-3 flex gap-3 text-lg leading-7 text-black"><Check className="mt-1 h-5 w-5 shrink-0 text-[#53b552]" /> {item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-[#17104d]">What Our Clients Says</h2>
          <div className="mx-auto mt-4 h-0.5 w-10 bg-[#ff2547]" />
          <div className="mx-auto mt-8 grid max-w-[900px] gap-6 md:grid-cols-2">
            <div className="rounded-md bg-white p-7 shadow-[0_8px_28px_rgba(23,16,77,0.07)]">
              <h3 className="text-xl font-bold text-[#333]">Ipercepts CRM</h3>
              <p className="mt-1 text-xl text-[#ffad32]">★★★★★</p>
              <div className="mt-7 aspect-video overflow-hidden bg-[#eef6fb]">
                {posts[2] ? <img src={imageFor(posts[2])} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[#251857]"><Camera className="h-16 w-16" /></div>}
              </div>
            </div>
            <div className="rounded-md bg-white p-7 shadow-[0_8px_28px_rgba(23,16,77,0.07)]">
              <h3 className="text-xl font-bold text-[#333]">Focus Softnet</h3>
              <p className="mt-1 text-xl text-[#ffad32]">★★★★★</p>
              <p className="mt-8 text-lg leading-8 text-[#8a8a8a]">It has been a pleasure using this discovery platform. The structured profile pages and visual listings make it easier to find relevant creative partners and compare options with confidence.</p>
              <p className="mt-5 text-lg leading-8 text-[#8a8a8a]">We value the clear layout, quick browsing, and useful details that make each portfolio easier to understand.</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#d0ced8]" /><span className="h-1.5 w-4 rounded-full bg-[#ff2547]" /></div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const stream = (timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(0, 6)
  return (
    <>
      <section className="bg-[#f4f8fc] py-24">
        <div className="mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold text-[#17104d]">Happy Clients</h2>
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {clients.map((client) => (
              <div key={client} className="grid h-24 place-items-center rounded-md border border-[#dedce7] bg-white px-8 text-center text-3xl font-bold text-[#2f3a4a]">{client}</div>
            ))}
          </div>
          <div className="mt-16 flex justify-center gap-2"><span className="h-1.5 w-4 rounded-full bg-[#ff2547]" /><span className="h-1.5 w-1.5 rounded-full bg-[#d0ced8]" /></div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1230px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.65fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-xl text-[#aaa6bd]">How does GloExpress</p>
            <h2 className="mt-1 text-4xl font-bold leading-tight text-[#17104d]">help exactly?</h2>
            <div className="mt-4 h-0.5 w-10 bg-[#ff2547]" />
            <p className="mt-6 text-lg leading-7 text-[#aaa6bd]">Searching for an appropriate and reliable creative profile is essential for the success of your next project. We help you get there.</p>
          </div>
          {[
            [Rocket, 'Get, Set & Go', 'Examine the profile, product, or service you want to work with.'],
            [PenLine, 'Pick a Category', 'Select a visual, service, or professional category that fits your goal.'],
            [ClipboardList, 'Examine the Alternatives', 'Search through providers, profiles, and image-rich portfolios.'],
          ].map(([Icon, title, text], index) => (
            <div key={title as string} className={`min-h-[300px] rounded-md border bg-white p-8 text-center ${index === 1 ? 'border-[#ff2547]' : 'border-[#dedce7]'}`}>
              <Icon className="mx-auto h-16 w-16 text-[#ff2547]" />
              <h3 className="mt-8 whitespace-pre-line text-3xl font-bold leading-tight text-[#251857]">{title as string}</h3>
              <p className="mt-6 text-lg leading-7 text-black">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#52636a] py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }} />
        <div className="relative mx-auto max-w-[1230px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl text-white/65">Go Through</p>
            <h2 className="mt-2 text-4xl font-bold">GloExpress Coverage</h2>
            <div className="mx-auto mt-5 h-0.5 w-10 bg-[#ff2547]" />
            <p className="mt-5 text-lg text-white/60">Get valuable insights on subjects that matter to you from our informative coverage.</p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {stream.slice(0, 3).map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group block">
                <img src={imageFor(post)} alt="" className="aspect-[16/7] w-full rounded-md border-4 border-white object-cover transition group-hover:-translate-y-1" />
                <h3 className="mt-5 line-clamp-2 text-xl font-bold">{post.title}</h3>
                <p className="mt-4 line-clamp-4 text-lg leading-7 text-white/60">{getEditableExcerpt(post, 180)}</p>
                <span className="mt-5 inline-flex rounded-md border border-white px-5 py-3 font-bold">Read More</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-listed" className="bg-white py-16">
      <div className="mx-auto grid max-w-[1230px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
        <div className="relative min-h-[280px] overflow-hidden rounded-md bg-[#251857] p-8 text-white shadow-[0_18px_52px_rgba(23,16,77,0.16)]">
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
          <div className="relative">
            <Megaphone className="h-12 w-12 text-[#ff2547]" />
            <h2 className="mt-6 max-w-md text-4xl font-black leading-tight">Keep your visual profile discoverable.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">Use GloExpress to browse image-led profiles, public details, and useful creative resources in one place.</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff2547]">Stay connected</p>
          <h2 className="mt-3 max-w-xl text-4xl font-bold leading-tight text-[#17104d]">Get listed or find the next profile that fits your project.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#8e8aa8]">Search visual posts, profiles, and portfolio-style pages with the same clean rhythm across the site.</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/signup" className="rounded-md bg-[#ff2547] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_22px_rgba(255,37,71,0.22)]">Get listed</Link>
            <Link href="/search" className="rounded-md border border-[#e6e4ed] bg-white px-7 py-3 text-sm font-bold text-[#251857]">Search profiles</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
