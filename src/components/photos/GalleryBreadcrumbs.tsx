"use client";

import { humanize } from "@/src/lib/utils/textConverter";
import Link from "next/link";

const galleryBaseHref = "/photos/";
const singlePhotoBaseHref = "/photo/";

interface GalleryBreadcrumbsProps {
  directory: string[];
  slug?: string;
  className?: string;
}

function GalleryBreadcrumbs({
  directory,
  className,
  slug,
}: GalleryBreadcrumbsProps) {
  let parts = [
    {
      label: "Gallery Home",
      href: galleryBaseHref,
    },
  ];

  directory.forEach((directorySegment: string, i: number) => {
    const href = `${galleryBaseHref}${directory.slice(0, i + 1).join("/")}`;

    parts.push({
      label: humanize(directorySegment) || "[ ]",
      href,
    });
  });

  if (slug) {
    parts.push({
      label: humanize(slug),
      href: `${singlePhotoBaseHref}${directory.join("/")}/${encodeURIComponent(slug)}`,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex" role="list">
        {parts.map(({ label, ...attrs }, index) => (
          <li className="mx-1 capitalize" role="listitem" key={index}>
            {index > 0 && <span className="inline-block mr-1">/</span>}

            <Link
              className="text-primary dark:text-darkmode-primary"
              {...attrs}
            >
              {label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export { GalleryBreadcrumbs };
