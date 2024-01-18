import React from "react";
import { CarouselUI } from "@/components/common/CarouselUI";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/config/productData";

export default function Recommendation() {
  return (
    <div className="w-full ml-4">
      <h3 className="font-medium text-lg ml-4">
        Other recommendations for your business
      </h3>
      <CarouselUI
        list={PRODUCTS}
        axis="x"
        basis={"basis-1/2 md:basis-1/3 lg:basis-1/4"}
      >
        {(item: Product) => (
          <Link href={"/product-detail"}>
            <Card
              className="bg-white rounded-lg mx-3 my-2"
              key={`${item.name}-${item.provider}`}
            >
              <div className="w-full aspect-square overflow-clip rounded-lg relative">
                <Image
                  src={item.images.image1}
                  className="rounded-lg object-cover"
                  alt="..."
                  fill
                  sizes="90vw 250px"
                />
              </div>

              <CardContent>
                <p className="text-sm my-2">{item.name}</p>
                <p className="text-lg font-bold my-2">{item.price}</p>
                <p className="text-sm my-2">Min. order: {item.minOrder}</p>
                <Link
                  className="text-sm underline hover:bg-slate-300"
                  href={`#`}
                >
                  {item.provider}
                </Link>
              </CardContent>
            </Card>
          </Link>
        )}
      </CarouselUI>
    </div>
  );
}
