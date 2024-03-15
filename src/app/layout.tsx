import config from "@/src/config/config.json";
import theme from "@/src/config/theme.json";
import TwSizeIndicator from "@/src/layouts/helpers/TwSizeIndicator";
import Footer from "@/src/layouts/partials/Footer";
import Header from "@/src/layouts/partials/Header";
import Providers from "@/src/layouts/partials/Providers";
import "@/src/styles/main.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link
          rel="shortcut icon"
          sizes="16x16 32x32 48x48"
          href={config.site.favicon.favicon}
        />
        <link rel="icon" type="image/png" href={config.site.favicon.icon} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={config.site.favicon.appleTouchIcon}
        />
        {/* theme meta */}
        <meta name="theme-name" content="nextplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
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
