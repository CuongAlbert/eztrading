"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CarouselUI } from "@/components/common";
import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import { Product } from "@/types/product";
import React from "react";
import { useRouter } from "next/navigation";

interface ListProps {
  products: Product[];
}

export default function List({ products }: ListProps) {
  return (
    <div className="w-full mx-auto mt-2 grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {products.map((p, idx) => (
        <Card
          key={`${p.name}-${p.provider}-${idx}`}
          className="bg-slate-50/50 backdrop-blur-md border-border border rounded-xl overflow-clip"
        >
          <CarouselUI list={Object.values(p.images)} axis="x" basis="">
            {(item: string) => (
              <div className="w-full aspect-square overflow-clip rounded-t-lg relative">
                <Image
                  src={item}
                  className="transition ease-in-out delay-250 duration-200 hover:scale-110 object-cover"
                  alt="..."
                  // sizes="90vw 250px"
                  fill
                />
              </div>
            )}
          </CarouselUI>
          <Link href={`/${p.slug}`}>
            <CardContent>
              <p className="my-2">{p.name}</p>
              <p className="text-2xl font-medium my-2">{p.price}</p>
              <p className="my-2">
                {`Min. order: `}
                {p.minOrder} {p.unit}
                {p.minOrder > 1 ? `s` : ``}
              </p>
              <p
                className="text-sm underline hover:bg-slate-300"
                // href={`/${p.provider}`}
              >
                {p.provider}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
