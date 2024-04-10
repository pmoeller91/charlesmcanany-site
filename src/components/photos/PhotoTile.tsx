import ExportedImage from "next-image-export-optimizer";
import { Tile } from "./Tile";

interface PhotoTileProps {
  src: string;
  width: number;
  height: number;
  alt: string;
}

function PhotoTile({ src, width, height, alt }: PhotoTileProps) {
  return (
    <Tile>
      <div className="h-full w-full flex flex-col justify-center">
        <ExportedImage src={src} width={width} height={height} alt={alt} />
      </div>
    </Tile>
  );
}

export { PhotoTile };
