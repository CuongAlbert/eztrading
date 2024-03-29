"use client";
import { CarouselUI } from "@/components/common/CarouselUI";
import React, { useState } from "react";
import Image from "next/image";

export default function ProductView(props: { images: Record<string, string> }) {
  const images = props.images;
  const [viewedImg, setViewedImg] = useState(Object.values(images)[0]);
  return (
    <div className="flex lg:flex-row flex-col-reverse gap-4 md:gap-6 my-8 lg:ml-4 relative">
      <div className="w-full max-h-[280px] lg:w-[20%] flex lg:flex-col gap-2 overflow-scroll">
        {Object.values(images).map((item: string) => (
          <div key={item} className="scroll-smooth focus:scroll-auto">
            <Image
              height={100}
              width={100}
              key={item}
              src={item}
              onMouseEnter={() => setViewedImg(item)}
              alt="..."
              className="mx-auto cursor-pointer hover:border-2 hover:border-blue-900 hover:border-solid-3 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div className="w-full aspect-square backdrop-blur-sm bg-gradient-to-tr from-green-50/90 to-orange-50/80 rounded-lg relative">
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
