import { isFolderPath} from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate } from "./Date"
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

export const Alltags: QuartzComponent = ({ cfg, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }
  const lis: string[] = []
    list.forEach((page) => {
        if (page.frontmatter?.tags) {
        page.frontmatter.tags.forEach((tag) => {
            if (!lis.includes(tag)&& tag !== "excalidraw" ) {
            lis.push(tag)
            }
        })
        }
    })
  return (
    <div class="alltags">
    <h2>Tags</h2>
    <ul class="gr">
    {lis.map((tag) => {
    return (
      <li class="sect-li">
        <a href={`/tags/${tag}`}>
          <div class="container">
                <h3 class="title">#{tag}</h3>
              </div>
        </a>
      </li>
    )
  })}
</ul>
</div>
  )}
  
Alltags.css = `
.alltags{
}

.gr {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
    padding: 0.2rem;
    margin: 0;
    border: 1px solid var(--secondary);
    border-radius: 0.5rem;
}

.sect-li {
    list-style: none;
    text-align: center;
    font-size: 5px;
}

.container {
    text-align: center;
    color: var(--dark);
    width: fit;
    border-radius: 0.5rem;
    border: 1px solid var(--secondary);
    background-color: var(--tertiary);
}

.container:hover {
    background-color: var(--dark);
    color: var(--light);
}

.title {
    font-size: 10px;
    margin: 0.1rem 0;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--light);
}

@media (max-width: 600px) {
    .container {
        padding: 0.25rem 0.4rem;
        font-size: 0.85rem;
    }
    .title {
        font-size: 0.85rem;
    }
}
`
