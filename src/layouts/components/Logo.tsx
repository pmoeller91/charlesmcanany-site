"use client";

import config from "@/src/config/config.json";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/public/images/logo.png";
import logoDark from "@/public/images/logo-darkmode.png";

const Logo = () => {
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
      <Image src={resolvedLogo} alt={title} priority />
    </Link>
  );
};

export default Logo;
