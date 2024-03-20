import { GalleryBreadcrumbs } from "./GalleryBreadcrumbs";

interface GallerySharedWrapperProps {
  children: React.ReactNode;
  directory: string[];
  slug?: string;
}

function GallerySharedWrapper({
  children,
  directory,
  slug,
}: GallerySharedWrapperProps) {
  return (
    <div className="container">
      <h2 className="h3 mb-3">Photos Porfolio</h2>
      <GalleryBreadcrumbs directory={directory} slug={slug} className="mb-3" />
      {children}
    </div>
  );
}

export { GallerySharedWrapper };
export type { GallerySharedWrapperProps };
