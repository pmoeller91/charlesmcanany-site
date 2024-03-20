import Image from "next/image";
import { Tile } from "./Tile";

interface PhotoTileProps {
  src: string;
  width: number;
  height: number;
}

function PhotoTile({ src, width, height }: PhotoTileProps) {
  return (
    <Tile>
      <div className="h-full w-full flex flex-col justify-center">
        <Image src={src} width={width} height={height} alt="photo" />
      </div>
    </Tile>
  );
}

export { PhotoTile };
