import { CombinedPhotoData } from "@/src/types/PhotoMetadata";
import ExportedImage from "next-image-export-optimizer";

import style from "./PhotoHero.module.scss";

interface PhotoHeroProps {
  photo: CombinedPhotoData;
}

function PhotoHero({ photo }: PhotoHeroProps) {
  return (
    <ExportedImage
      src={photo.path}
      width={photo.metadata.width}
      height={photo.metadata.height}
      alt={photo.title ?? "Untitled"}
      className={`m-auto ${style["shadow-box"]}`}
    />
  );
}

export { PhotoHero };
