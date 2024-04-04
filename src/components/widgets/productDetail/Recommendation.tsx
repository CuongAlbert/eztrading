import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CarouselUI } from "@/components/common/CarouselUI";
import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import { Product } from "@/types/product";
import React from "react";

export default function Recommendation(props: {
  list: Product[];
  title: string;
}) {
  const { list, title } = props;
  return (
    <div className="w-full">
      {list.length > 0 && <h3 className="font-bold text-xl py-4">{title}</h3>}
      {list.length > 0 && (
        <CarouselUI
          list={list}
          axis="x"
          basis={"basis-1/2 md:basis-1/3 lg:basis-1/4"}
        >
          {(item: Product) => (
            <Link href={`/${item.slug}`}>
              <Card
                className="bg-slate-50/50 rounded-xl mx-2 my-2 flex flex-col h-full w-full overflow-clip border-none"
                key={`${item.name}-${item.provider}`}
              >
                <div className="w-full aspect-square relative">
                  <Image
                    src={Object.values(item.images)[0]}
                    className="object-cover"
                    alt="..."
                    fill
                    sizes="90vw 250px"
                  />
                </div>

                <CardContent className="flex flex-col gap-2 pt-2 px-2">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-lg font-bold">{item.price}</p>
                  <p className="text-sm">Min.order: {item.minOrder}</p>
                  <div className="text-sm underline hover:bg-slate-300">
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
