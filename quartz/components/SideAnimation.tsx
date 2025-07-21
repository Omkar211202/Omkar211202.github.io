import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

function SideLogo({ displayClass }: QuartzComponentProps) {
  return <div class={classNames(displayClass, "side-logo")}>
    <img src="/static/nav.png" alt="Logo" height={300} width={250} />
  </div>
}

export default (() => SideLogo) satisfies QuartzComponentConstructor
