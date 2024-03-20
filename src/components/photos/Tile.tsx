import clsx from "clsx";
import React from "react";

interface TileProps {
  children: React.ReactNode;
  className?: string;
}

function Tile({ children, className }: TileProps) {
  return (
    <div
      className={clsx(
        "sm:w-32 border-2 rounded-sm bg-theme-light dark:bg-darkmode-theme-light shadow-md dark:shadow-gray-600",
        className,
      )}
    >
      <div className="aspect-square h-auto">{children}</div>
    </div>
  );
}

export { Tile };
