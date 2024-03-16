"use client";

import Logo from "@/src/components/Logo";
import ThemeSwitcher from "@/src/components/ThemeSwitcher";
import config from "@/src/config/config.json";
import menuJson from "@/src/config/menu.json";
import {
  NavigationMenu,
  isNavigationCategory,
  isNavigationLink,
} from "@/src/types/Navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  // Destructuring main menu config from navigation config
  const { main } = menuJson as NavigationMenu;

  const { settings } = config;

  // get current path
  const pathname = usePathname();

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0 h-auto">
          <Logo className="max-h-12 w-auto max-w-[33vw]" />
        </div>
        {/* navbar toggler */}
        <input
          id="nav-toggle"
          type="checkbox"
          className="hidden"
          checked={openMobileMenu}
          onChange={() => {
            setOpenMobileMenu((isMenuOpen) => !isMenuOpen);
          }}
        />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark dark:text-white lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        <ul
          id="nav-menu"
          className={clsx(
            "navbar-nav order-3 w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8",
            { hidden: !openMobileMenu },
          )}
        >
          {main.map((menuItem, i) => {
            if (
              isNavigationCategory(menuItem) &&
              menuItem.children.length > 0
            ) {
              return (
                <li
                  className="nav-item nav-dropdown group relative"
                  key={`menu-${i}`}
                >
                  <span
                    className={clsx([
                      "nav-link",
                      "inline-flex",
                      "items-center",
                      {
                        active: menuItem.children.some((menuItem) =>
                          `${menuItem.url}/`.includes(pathname),
                        ),
                      },
                    ])}
                  >
                    {menuItem.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menuItem.children.map((child, i) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          href={child.url}
                          className={clsx([
                            "nav-dropdown-link",
                            "block",
                            { active: `${child.url}/`.includes(pathname) },
                          ])}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            } else if (isNavigationLink(menuItem)) {
              return (
                <li className="nav-item" key={`menu-${i}`}>
                  <Link
                    href={menuItem.url}
                    className={clsx([
                      "nav-link",
                      "block",
                      { active: `${menuItem.url}/`.includes(pathname) },
                    ])}
                  >
                    {menuItem.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <div className="order-1 flex-grow" />
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          <ThemeSwitcher className="mr-5" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
