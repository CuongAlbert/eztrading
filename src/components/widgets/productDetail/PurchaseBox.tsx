import { Button } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
export default function PurchaseBox(props: { product: Product }) {
  const product = props.product;
  return (
    <div className="flex flex-col sticky h-[80vh] top-2 border-2 border-blue-900 rounded-lg mt-4">
      <Card className="mx-auto my-2">
        <CardContent className="flex flex-col gap-3">
          <h1>Prices</h1>
          <p className="font-bold">{product.price}</p>
          <hr className="text-blue-600" />
          <h1>Quantity</h1>
          <input
            type="number"
            className="border-2 border-blue-900 rounded-full w-20 py-2 px-3"
            min={product.minOrder}
            defaultValue={product.minOrder}
          />
          <hr className="text-blue-600" />
          <h1>Variations</h1>
          <div className="flex justify-between">
            <p>Total options</p>
            <Link className="underline font-semibold" href={"/"}>
              Select now
            </Link>
          </div>
          <div className="flex justify-between">
            <Button variant="primary">{`Order`}</Button>
            <Button variant="secondary">{`Request`}</Button>
          </div>
          <hr className="text-blue-600" />
          <h1 className="font-bold">Membership Benifits</h1>
          <div className="flex gap-1">
            <p>{`US $${100} coupons`}</p>
            <Link href={"./"} className="underline">
              View more
            </Link>
          </div>
          <hr className="text-blue-600" />
          <h1 className="font-bold">Purchase Detail</h1>
        </CardContent>
      </Card>
    </div>
  );
}
