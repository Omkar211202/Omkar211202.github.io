import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

import { formatDate, getDate } from "./Date"
import readingTime from "reading-time"

export const Og = (
  cfg: GlobalConfiguration,
  fileData: QuartzPluginData,
  colorScheme: string,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
) => {
  let created: string | undefined
  let reading: string | undefined
  if (fileData.dates) {
    created = formatDate(getDate(cfg, fileData)!, cfg.locale)
  }
  const { minutes, text: _timeTaken, words: _words } = readingTime(fileData.text!)
  reading = i18n(cfg.locale).components.contentMeta.readingTime({
    minutes: Math.ceil(minutes),
  })
 
  const Li = [created, reading]

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
        backgroundSize: "100% 100%",
      }}
    >
      {/* Title at bottom right of image */}
      <div
        style={{
          position: "absolute",
          center: "3.5rem",
          middle: "3.5rem",
          background: "rgba(0,0,0,0.85)", // More opaque for better contrast
          color: "#fff",
          padding: "1.5rem 2.5rem",       // More padding
          borderRadius: "0.75rem",        // Slightly more rounded
          fontSize: "2.7rem",             // Slightly larger font
          fontWeight: 800,                // Bolder
          maxWidth: "65%",
          textAlign: "right",
          fontFamily: fonts[0].name,
          zIndex: 10,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
          border: "2px solid rgba(255,255,255,0.25)", // Subtle border
          textShadow: "0 2px 8px rgba(0,0,0,0.7), 0 1px 0 #222", // Text shadow for readability
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          overflow: "hidden",
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.4) 70%)",
        }}
      />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "1.5rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          marginLeft: "4rem",
        }}
      >
        {!(fileData.slug?.startsWith("Excalidraw")) && (
          <img
        src={`https://${cfg.baseUrl}/content/Resources/${fileData.frontmatter?.image}`}
        width={80}
        height={80}
        style={{
          position: "relative",
          backgroundClip: "border-box",
          borderRadius: "6rem",
        }}
          />
        )}
        <div
          style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        fontFamily: fonts[0].name,
          }}
        >
          <h2
        style={{
          color: cfg.theme.colors[colorScheme as keyof typeof cfg.theme.colors].light,
          fontSize: "3rem",
          fontWeight: 700,
          marginRight: "4rem",
          fontFamily: fonts[0].name,
        }}
          >
        {title}
          </h2>
          <ul
        style={{
          color: cfg.theme.colors[colorScheme as keyof typeof cfg.theme.colors].gray,
          gap: "1rem",
          fontSize: "1.5rem",
          fontFamily: fonts[1].name,
        }}
          >
        {Li.map((item, index) => {
          if (item) {
            return <li key={index}>{item}</li>
          }
        })}
          </ul>
        </div>
        <p
          style={{
        color: cfg.theme.colors[colorScheme as keyof typeof cfg.theme.colors].light,
        fontSize: "1.5rem",
        overflow: "hidden",
        marginRight: "8rem",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 7,
        WebkitBoxOrient: "vertical",
        lineClamp: 7,
        fontFamily: fonts[1].name,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}