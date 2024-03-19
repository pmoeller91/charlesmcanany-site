import Image from "next/image";

interface PhotoTileProps {
  src: string;
  width: number;
  height: number;
}

function PhotoTile({ src, width, height }: PhotoTileProps) {
  return (
    <div className="sm:w-32 border-2 rounded-sm bg-theme-light dark:bg-darkmode-theme-light">
      <div className="aspect-square h-auto">
        <div className="h-full w-full p-2 flex flex-col justify-center">
          <Image src={src} width={width} height={height} alt="photo" />
        </div>
      </div>
    </div>
  );
}

export { PhotoTile };
