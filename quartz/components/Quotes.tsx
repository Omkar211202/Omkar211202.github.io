import { QuartzComponent } from "./types"

const quotes = [
  // 🌟 Sathya Sai Baba Quotes
  "Love all, serve all.",
  "Help ever, hurt never.",
  "Hands that serve are holier than lips that pray.",
  "Duty without love is deplorable, duty with love is desirable, love without duty is divine.",
  "The end of education is character.",
  "You cannot always oblige, but you can always speak obligingly.",
  "Service to man is service to God.",
  "Start the day with love, fill the day with love, end the day with love — this is the way to God.",
  "Life is a song – sing it. Life is a game – play it. Life is a challenge – meet it. Life is a dream – realize it.",
  "There is only one religion, the religion of love; only one language, the language of the heart.",

  // 🌍 Famous Global Quotes
  "The best way to get started is to quit talking and begin doing.",
  "Success is not in what you have, but who you are.",
  "Opportunities don't happen, you create them.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "In the middle of every difficulty lies opportunity.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "Be the change that you wish to see in the world.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "It does not matter how slowly you go as long as you do not stop.",
];



const Quotes : QuartzComponent = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const quote = quotes[randomIndex]
  return (
    <div
      style={{
        background: "var(--card-bg, #fff)",
        color: "var(--card-fg, #222)",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: "1.5rem 2rem",
        margin: "2rem auto 0 auto",
        maxWidth: "500px",
        fontFamily: "inherit",
        border: "1px solid var(--card-border, #e0e0e0)",
      }}
    >
      <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: "1.15rem" }}>
        {quote}
      </blockquote>
    </div>
  )
}

export default Quotes
