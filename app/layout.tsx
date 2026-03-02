import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-none font-sans antialiased relative isolate",
          fontSans.variable,
        )}
      >
        <div aria-hidden="true" className="space-bg" />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <a
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              href="#main-content"
            >
              Skip to main content
            </a>
            <Navbar />
            <main
              className="container mx-auto max-w-7xl pt-14 px-6 flex-grow"
              id="main-content"
            >
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center gap-2 py-6 text-xs text-default-500">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link isExternal href={siteConfig.links.swapi}>
                  Data from SWAPI
                </Link>
                <span aria-hidden="true">•</span>
                <Link isExternal href={siteConfig.links.gallery}>
                  Portraits by SWAPI Gallery
                </Link>
              </div>
              <span>Alliance Personnel Archive — internal use only</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
