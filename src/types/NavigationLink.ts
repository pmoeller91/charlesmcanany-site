//  child navigation link interface
export interface ChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface NavigationLink {
  name: string;
  url: string;
  children?: ChildNavigationLink[];
}