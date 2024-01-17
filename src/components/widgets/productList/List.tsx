"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CarouselUI } from "@/components/common";
import { PRODUCTS } from "@/config/productData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function List() {
  return (
    <div className="w-full bg-slate-200 mx-auto mt-2 grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
      {PRODUCTS.map((p) => (
        <Card
          key={`${p.name}-${p.provider}`}
          className="bg-white rounded-lg mx-3 my-2 p-2"
        >
          <CardHeader className="rounded-lg">
            <CarouselUI list={Object.values(p.images)} axis="x" basis="">
              {(item: string) => (
                <div className="rounded-lg w-[180px] h-[180px]">
                  <Image
                    src={item}
                    className="transition ease-in-out delay-250 duration-500 hover:scale-110 rounded-lg"
                    alt="..."
                    width={180}
                    height={180}
                    sizes="90vw 250px"
                    // fill
                  />
                </div>
              )}
            </CarouselUI>
          </CardHeader>
          <Link href={"./product-detail"}>
            <CardContent>
              <p className="text-sm my-2">{p.name}</p>
              <p className="text-lg font-bold my-2">{p.price}</p>
              <p className="text-sm my-2">
                {`Min. order: `}
                {p.minOrder} {p.unit}
                {p.minOrder > 1 ? `s` : ``}
              </p>
              <Link
                className="text-sm underline hover:bg-slate-300"
                href={`/${p.provider}`}
              >
                {p.provider}
              </Link>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
