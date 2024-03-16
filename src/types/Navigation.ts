export interface NavigationLink {
  name: string;
  url: string;
}

export interface NavigationCategory {
  name: string;
  children: NavigationLink[];
}

export type NavigationMenuEntry = NavigationLink | NavigationCategory;

export interface NavigationMenu {
  main: NavigationMenuEntry[];
  footer: NavigationLink[];
}

export function isNavigationCategory(
  navMenuEntry: NavigationMenuEntry,
): navMenuEntry is NavigationCategory {
  return "children" in navMenuEntry;
}

export function isNavigationLink(
  navMenuEntry: NavigationMenuEntry,
): navMenuEntry is NavigationLink {
  return "url" in navMenuEntry;
}
