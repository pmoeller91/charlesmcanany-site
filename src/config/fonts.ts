import { Heebo, Signika } from "next/font/google";

const primary = Heebo({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-primary",
});

const secondary = Signika({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-secondary",
});

export { primary, secondary };
