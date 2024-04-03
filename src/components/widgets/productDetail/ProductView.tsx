"use client";

import React, { useState } from "react";

import { CarouselUI } from "@/components/common/CarouselUI";
import Image from "next/image";

export default function ProductView(props: { images: Record<string, string> }) {
  const images = props.images;
  const [viewedImg, setViewedImg] = useState(Object.values(images)[0]);
  return (
    <div className="flex lg:flex-row flex-col-reverse gap-8 relative h-[480px]">
      <div className="w-24 h-full flex lg:flex-col gap-2 overflow-scroll ">
        {Object.values(images).map((item: string) => (
          <div
            key={item}
            className="scroll-smooth focus:scroll-auto relative w-full aspect-square"
          >
            <Image
              // height={100}
              // width={100}
              fill
              key={item}
              src={item}
              onMouseEnter={() => setViewedImg(item)}
              alt="..."
              className={`mx-auto cursor-pointer hover:border-2 hover:border-blue-900 hover:border-solid-3 rounded-lg object-contain ${
                viewedImg === item
                  ? "border-2 border-blue-900 border-solid-3"
                  : "border-0"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="w-full backdrop-blur-sm bg-gray-100 rounded-lg relative">
        <Image
          fill
          className="object-contain rounded-lg"
          alt="...."
          src={viewedImg}
        />
      </div>
    </div>
  );
}
