import { CombinedPhotoData } from "@/src/types/PhotoMetadata";
import Image from "next/image";

import style from "./PhotoHero.module.scss";

interface PhotoHeroProps {
  photo: CombinedPhotoData;
}

function PhotoHero({ photo }: PhotoHeroProps) {
  return (
    <Image
      src={photo.path}
      width={photo.metadata.width}
      height={photo.metadata.height}
      alt={photo.title ?? "Untitled"}
      className={`m-auto ${style["shadow-box"]}`}
    />
  );
}

export { PhotoHero };
