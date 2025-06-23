import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hans Zimmer - Maestro of Cinematic Emotions",
  description:
    "Experience the revolutionary world of Hans Zimmer - composer of legendary film scores including Interstellar, Inception, Dune, and The Dark Knight. Immerse yourself in cinematic excellence.",
  keywords:
    "Hans Zimmer, film composer, movie soundtracks, Interstellar, Inception, Dune, The Dark Knight, cinematic music",
  openGraph: {
    title: "Hans Zimmer - Maestro of Cinematic Emotions",
    description: "Experience the revolutionary world of Hans Zimmer's cinematic compositions",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#D4AF37" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
