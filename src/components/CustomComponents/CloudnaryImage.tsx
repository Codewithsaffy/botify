"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

const CloudnaryImage = ({
  height,
  width,
  className,
  quality,
  layout,
  src,
  alt,
  priority
}: {
  height?: number;
  width?: number;
  className: string;
  quality?: number;
  layout?: string;
  src: string;
  alt: string;
  priority?: boolean;
}) => {
  return (
    <>
      <CldImage
        src={src}
        alt={alt}
        layout={layout}
        height={height}
        width={width}
        quality={quality}
        className={className}
      />
    </>
  );
};

export default CloudnaryImage;
