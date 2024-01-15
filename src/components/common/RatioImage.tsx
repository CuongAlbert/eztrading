"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  anchor: { dim: "width" | "height"; value: number };
}

export const RatioImage = ({ src, alt, anchor }: Props) => {
  const [ratio, setRatio] = useState(1);
  return (
    <Image
      src={src}
      alt={alt}
      width={anchor.dim === "width" ? anchor.value : anchor.value * ratio}
      height={anchor.dim === "height" ? anchor.value : anchor.value / ratio}
      //   layout="fixed"
      onLoadingComplete={({ naturalWidth, naturalHeight }) => {
        setRatio(naturalWidth / naturalHeight);
      }}
    />
  );
};
