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
  title: "Latest Notes",
  limit: 10,
  linkToMore: false,
  showTags: false,
  filterFn: (node) =>
    node.slugSegment !== "tags" &&
    !node.frontmatter?.title?.endsWith("excalidraw"),
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

    const pages = allFiles
      .filter(opts.filterFn)
      .sort(opts.sort)
      .filter((file) => file.slug !== "index")

    const notes = pages.slice(0, opts.limit)

    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>

        <ul class="recent-ul marquee-container">
          <div class="marquee-track">
            {[...notes, ...notes].map((page) => {
              const title =
                page.frontmatter?.title ??
                i18n(cfg.locale).propertyDefaults.title
              const photo = page.frontmatter?.image || "/Resources/Root.jpg"

              return (
                <li class="recent-li marquee-item">
                  <a
                    class="image-container"
                    href={resolveRelative(fileData.slug!, page.slug!)}
                  >
                    <img
                      src={typeof photo === "string" ? photo : undefined}
                      alt={title}
                      height={190}
                      width={325}
                    />
                    <div class="recent-title">{title}</div>
                  </a>

                  {page.dates && (
                    <p class="recent-date">
                      <Date
                        date={getDate(cfg, page)!}
                        locale={cfg.locale}
                      />
                    </p>
                  )}
                </li>
              )
            })}
          </div>
        </ul>
      </div>
    )
  }

  RecentNotes.css =
    style +
    `
/* Container */
.marquee-container {
  position: relative;
  overflow: hidden;
  padding: 0;
  list-style: none;
}

/* Moving strip */
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 32s linear infinite;
}

/* Individual card */
.marquee-item {
  flex: 0 0 auto;
  width: 325px;
  margin-right: 0.75rem;
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}

/* Image */
.image-container {
  position: relative;
  display: block;
}

.image-container img {
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 0.25rem;
}

/* Title overlay */
.recent-title {
  position: absolute;
  right: 1rem;
  bottom: 2rem;
  background: rgba(232, 32, 32, 0.9);
  color: white; /* Changed text-color to color */
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  max-width: 90%;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Date */
.recent-date {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: black;
}

/* Animation */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-25%);
  }
}

/* Pause on hover */
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: fadeIn 0.5s ease-out forwards;
  }
}
`

  return RecentNotes
}) satisfies QuartzComponentConstructor
