/* eslint-disable jsx-a11y/alt-text */
"use client";

import { $ElementProps } from "@/src/lib/utils/ElementProps";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageFallbackProps extends $ElementProps<typeof Image> {
  fallback?: string;
}

const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  if (!fallback) {
    return <Image {...rest} src={src} />;
  }

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
