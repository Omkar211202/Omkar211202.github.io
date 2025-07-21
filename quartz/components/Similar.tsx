import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative} from "../util/path"
import { i18n } from "../i18n"
import OverflowListFactory from "./OverflowList"
import { byDateAndAlphabetical } from "./PageList"

interface BacklinksOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: BacklinksOptions = {
  hideWhenEmpty: false,
}

export default ((opts?: Partial<BacklinksOptions>) => {
  const options: BacklinksOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const Similar: QuartzComponent = ({
    fileData,
    allFiles,
    cfg,
  }: QuartzComponentProps) => {
    const tags=(fileData.frontmatter?.tags)
    const backlinkFiles = allFiles.filter((file) => file.frontmatter?.tags?.some(item =>tags?.includes(item))).sort(byDateAndAlphabetical(cfg)).filter((file) => file.frontmatter?.title !== fileData.frontmatter?.title)
    if (options.hideWhenEmpty && backlinkFiles.length == 0) {
      return null
    }
    return (
      <div>
        <OverflowList class="horizontal">
        <h3>Also Read:</h3>
          {backlinkFiles.length > 0 ? (
            
            backlinkFiles.slice(0,5).map((f) => (
              <li>
                <div class="image-cont">
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="">
                <img src={f.frontmatter?.image as string} alt={f.frontmatter?.title} height={75} width={100} />
                <div class="recent-title">
                  {f.frontmatter?.title}
                </div>
                </a>
                </div>
              </li>      
            ))
          ) : (
            <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
          )}
        </OverflowList>
      </div>
    )
  }

  Similar.css = style+ `
.horizontal {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: thin;
  height: 35rem;
  border-radius: 0.5rem;
  padding: 5px;
  width: fit-content;
}

.image-cont {
  position: relative;
  width: auto;
  height: auto;
}
.image-cont img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recent-title {
  font-size: 0.8rem;
  }

`
  Similar.afterDOMLoaded = overflowListAfterDOMLoaded

  return Similar
}) satisfies QuartzComponentConstructor