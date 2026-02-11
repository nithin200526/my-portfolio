import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono, Outfit, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Nandala Nithin | Full Stack Developer & AI Engineer",
  description: "Portfolio of Nandala Nithin — Full Stack Developer building scalable web applications powered by AI.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased overflow-x-hidden ${outfit.variable} ${playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
