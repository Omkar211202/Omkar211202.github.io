import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul pagelist-grid">
      {list.map((page) => {
        const title = page.frontmatter?.title ?? ""
        const tags = page.frontmatter?.tags ?? []
        const image = page.frontmatter?.image ?? "/Resources/Root.jpg"
        return (
          <li class="section-li">
          <a href={resolveRelative(fileData.slug!, page.slug!)}>
            <div class="box">
              <div class="desc">
              <div class="container">
              <img src={image as string} alt={title as string} height={200} width={355} />

              <div class="bottom-right">{title}</div>
              {/* <ul class="tags bottom-down">
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
              </ul> */}
              </div>

              <h2 class="title">
                <a href={resolveRelative(fileData.slug!, page.slug!)} class="heading">
                  {title}
                </a>
              </h2>
              </div>              


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
              <p class="meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
              </p>
            </div>
          </a>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}

.pagelist-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  justify-items: center;
}

@media (max-width: 600px) {
  .pagelist-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.pagelist-grid > .section-li {
  margin: 0;
}

.box {
  border: 3px solid var(--darkgray);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: var(--light);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 90%;
  }

.desc {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.title {
  text-sze: 32px;
  margin: 0.1rem 0 0.1rem 0;
}

.meta {
  display: flex;
  justify-content: flex-end;
  margin: 0.1rem 0 0.1rem 0;
}

.tags {
  margin: 0.1rem 0 0.1rem 0;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  list-style: none;

}

.heading{
  text-decoration: none;
  background-color: yellow;
  font-size: 1.5rem;}

.container{
  position:relative;
  text-align:center;
  color: white;

  }

.bottom-right{
  position:absolute;
  bottom: 32px;
  right: 32px;
  font-size: 1.2rem;
  background-color: red;
  padding: 4px;
  border-radius: 0.5rem;
  
  }

.bottom-down{
  position:absolute;
  bottom: 16px;
  right: 32px;
  font-size: 1rem;
  padding: 4px;
  border-radius: 0.5rem;
}`
