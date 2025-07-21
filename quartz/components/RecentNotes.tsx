import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filterFn: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title:"Latest Notes",
  limit: 10,
  linkToMore: false,
  showTags: true,
  filterFn: (node) => node.slugSegment !== "tags" ,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filterFn).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    const pag=pages.filter((file) => ! file.frontmatter?.title.endsWith('excalidraw'))
    const notes = pag.filter((file) => file.slug != "index")
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        <ul class="recent-ul horizontal-ul">
          {notes.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []
            const photo = page.frontmatter?.image || "./Root.jpg"
            return (
              <li class="recent-li horizontal-li">
                <div class="section">
                  <a class="image-container" href={resolveRelative(fileData.slug!,page.slug!)}>
                    <img src={typeof photo === "string" ? photo : undefined} alt={title} height={190} width={325} />
                    <div class="recent-title">
                        {title}
                    </div>
                  </a>
                  {page.dates && (
                    <p class="">
                      <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                    </p>
                  )}
                  {opts.showTags && (
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        {opts.linkToMore && remaining > 0 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style + `
.horizontal-ul {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: thin;
}
.horizontal-li {
  flex: 1 1 0;
  min-width: 325px;
  max-width: 400px;
  border: 2px solid var(--lightgray);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.image-container {
  position: relative;
  width: auto;
  height: auto;
}
.image-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.recent-title {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  background: rgba(255,255,255,0.85);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
  max-width: 90%;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`
  return RecentNotes
}) satisfies QuartzComponentConstructor
