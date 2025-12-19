import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Graph(),
],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/omkar211202",
      LinkedIn: "https://www.linkedin.com/in/omkarkathi",
      Portfolio:"https://omkar-kathi.vercel.app"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    Component.Quotes,
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.ConditionalRender({
      component: Component.RecentNotes(),
      condition: (page) => page.fileData.slug == "index",
    }),
    Component.MobileOnly(Component.Podcasts()),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    
    Component.ConditionalRender({
      component:Component.DesktopOnly(Component.TableOfContents()),
     condition:(page)=> page.fileData.slug !== "index",}),

     Component.Explorer(),
  ],
  
  right: [
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.Alltags),
      condition: (page) => page.fileData.slug == "index",
    }),
    Component.ConditionalRender({
      component: Component.Similar(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(Component.Alltags),
  ],
}
