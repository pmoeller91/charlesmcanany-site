import { CombinedPhotoData } from "@/src/types/PhotoMetadata";

import style from "./PhotoHero.module.scss";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

interface PhotoHeroProps {
  photo: CombinedPhotoData;
}

function PhotoHero({ photo }: PhotoHeroProps) {
  return (
    <Link href={photo.path}>
      <ExportedImage
        src={photo.path}
        width={photo.metadata.width}
        height={photo.metadata.height}
        alt={photo.title ?? "Untitled"}
        className={`m-auto ${style["shadow-box"]}`}
      />
    </Link>
  );
}

export { PhotoHero };
