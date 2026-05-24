import type { Metadata, Viewport } from "next"
import "./globals.css"
import PwaRegister from "@/components/PwaRegister"

export const metadata: Metadata = {
  title: "Sovietalizer",
  description: "Explore Soviet culture through a brutalist building",
  applicationName: "Sovietalizer",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Sovietalizer" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#080c18",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="h-full">
          {children}
          <PwaRegister />
        </body>
    </html>
  )
}
