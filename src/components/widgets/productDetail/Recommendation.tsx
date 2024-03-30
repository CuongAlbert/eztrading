import React from "react";
import { CarouselUI } from "@/components/common/CarouselUI";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function Recommendation(props: {
  list: Product[];
  title: string;
}) {
  const { list, title } = props;
  return (
    <div className="w-full ml-4">
      {list.length > 0 && <h3 className="font-medium text-lg ml-4">{title}</h3>}
      {list.length > 0 && (
        <CarouselUI
          list={list}
          axis="x"
          basis={"basis-1/2 md:basis-1/3 lg:basis-1/4"}
        >
          {(item: Product) => (
            <Link href={`/${item.slug}`}>
              <Card
                className="bg-slate-50/50 backdrop-blur-md border-border border rounded-xl mx-3 my-2 flex gap-2 flex-col h-full"
                key={`${item.name}-${item.provider}`}
              >
                <div className="w-full aspect-square overflow-clip rounded-lg relative">
                  <Image
                    src={Object.values(item.images)[0]}
                    className="rounded-lg object-cover"
                    alt="..."
                    fill
                    sizes="90vw 250px"
                  />
                </div>

                <CardContent className="h-full flex flex-col">
                  <p className="text-sm my-2 h-full">{item.name}</p>
                  <p className="text-lg font-bold my-2 h-full">{item.price}</p>
                  <p className="text-sm my-2 h-full">
                    Min.order: {item.minOrder}
                  </p>
                  <div className="text-sm underline hover:bg-slate-300 h-full">
                    {item.provider}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </CarouselUI>
      )}
    </div>
  );
}
