"use client";
import { CarouselUI } from "@/components/common/CarouselUI";
import React, { useState } from "react";
import Image from "next/image";

export default function ProductView(props: { images: Record<string, string> }) {
  const images = props.images;
  const [viewedImg, setViewedImg] = useState(Object.values(images)[0]);
  return (
    <div className="flex gap-4 md:gap-6 my-8 ml-4 relative">
      <div className="w-[20%]">
        {Object.values(images).map((item: string) => (
          <div key={item} className="scroll-smooth focus:scroll-auto">
            <Image
              height={100}
              width={100}
              key={item}
              src={item}
              onMouseEnter={() => setViewedImg(item)}
              alt="..."
              className="mx-auto my-2 cursor-pointer hover:border-2 hover:border-blue-900 hover:border-solid-3 rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="w-[80%] bg-slate-200 rounded-lg relative">
        <Image
          // height={150}
          // width={150}
          fill
          className="object-cover rounded-lg"
          alt="...."
          src={viewedImg}
        />
      </div>
    </div>
  );
}
