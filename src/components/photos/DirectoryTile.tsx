import React from "react";
import { Tile } from "./Tile";
import { CombinedPhotoData } from "@/src/types/PhotoMetadata";
import { titleify } from "@/src/lib/utils/textConverter";
import DynamicIcon from "../helpers/DynamicIcon";

import style from "./DirectoryTile.module.scss";
import ExportedImage from "next-image-export-optimizer";

interface DirectoryTileProps {
  directoryName: string;
  thumbnail?: CombinedPhotoData;
}

function DirectoryTile({ directoryName, thumbnail }: DirectoryTileProps) {
  return (
    <Tile className={`${style["directory-tile"]} relative`}>
      {thumbnail && (
        <div
          className={`absolute h-full w-full object-contain z-0 p-2 ${style["image-fade"]}`}
        >
          <ExportedImage
            src={thumbnail.path}
            width={thumbnail.metadata.width}
            height={thumbnail.metadata.height}
            className="rounded-sm h-auto w-auto"
            aria-hidden="true"
            alt="Thumbnail"
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-end h-full z-10 relative px-2 pt-2">
        <div className="inline-block">
          <DynamicIcon icon="FaFolder" title="Folder" size="2em" />
        </div>
        <p className="inline-block break-words min-w-0">
          {titleify(directoryName)}
        </p>
      </div>
    </Tile>
  );
}

export { DirectoryTile };
