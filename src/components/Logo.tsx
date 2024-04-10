"use client";

import config from "@/src/config/config.json";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/public/images/logo.png";
import logoDark from "@/public/images/logo-darkmode.png";
import ExportedImage from "next-image-export-optimizer";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  // destructuring items from config object
  const {
    title,
  }: {
    title: string;
  } = config.site;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo =
    mounted && (theme === "dark" || resolvedTheme === "dark") ? logoDark : logo;

  return (
    <Link href="/" className="navbar-brand">
      <ExportedImage src={resolvedLogo} alt={title} className={className} priority />
    </Link>
  );
};

export default Logo;
