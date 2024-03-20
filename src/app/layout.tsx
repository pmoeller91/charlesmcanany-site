import config from "@/src/config/config.json";
import TwSizeIndicator from "@/src/components/helpers/TwSizeIndicator";
import Footer from "@/src/components/partials/Footer";
import Header from "@/src/components/partials/Header";
import Providers from "@/src/components/partials/Providers";
import "@/src/styles/main.scss";
import { Metadata, Viewport } from "next";
import { primary, secondary } from "../config/fonts";

export const metadata: Metadata = {
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* favicon */}
        <link
          rel="shortcut icon"
          sizes="16x16 32x32 48x48"
          href={config.site.favicon}
        />
      </head>

      <body
        className={`${primary.className} ${secondary.className}`}
        suppressHydrationWarning={true}
      >
        <TwSizeIndicator />
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main>{children}</main>
            <div className="flex-grow" />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
