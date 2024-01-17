"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CarouselUI } from "@/components/common";
import { PRODUCTS } from "@/config/productData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
interface ListProps {
  products: Product[];
}

export default function List({ products }: ListProps) {
  const router = useRouter();
  if (!products || products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-slate-11">No Products Found</h1>
        <button
          className="btn btn-primary mt-4"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>
    );
  return (
    <div className="w-full  mx-auto mt-2 grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
      {products.map((p) => (
        <Card
          key={`${p.name}-${p.provider}`}
          className="bg-white rounded-lg mx-3 my-2 p-2"
        >
          <CarouselUI list={Object.values(p.images)} axis="x" basis="">
            {(item: string) => (
              <div className="w-full aspect-square overflow-clip rounded-lg">
                <Image
                  src={item}
                  className="transition ease-in-out delay-250 duration-200 hover:scale-110 object-cover"
                  alt="..."
                  sizes="90vw 250px"
                  fill
                />
              </div>
            )}
          </CarouselUI>
          <Link href={`/${p.slug}`}>
            <CardContent>
              <p className="my-2">{p.name}</p>
              <p className="text-lg font-bold my-2">{p.price}</p>
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
