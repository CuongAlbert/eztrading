"use client";
import { Button } from "@/components/common";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SendRequest } from "../send-request";
export default function PurchaseBox(props: { product: Product }) {
  const product = props.product;
  const price = Number(product.price.slice(1));
  const [subtotal, setSubtotal] = useState<number>(product.minOrder * price);

  const handleCalSubtotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qual: number = Number(event.target.value);
    setSubtotal(qual * price);
  };
  return (
    <div className="flex flex-col sticky lg:relative lg:h-[80vh] lg:top-2 ">
      <Card className="mx-auto lg:my-2 w-full bg-slate-50/50 backdrop-blur-md border-border border rounded-xl">
        <CardContent className="flex flex-col gap-8 py-8">
          <div className="w-full flex flex-col gap-2">
            <Label>Price</Label>
            <p className="font-bold text-xl">{product.price}</p>
          </div>
          <hr className="text-blue-600" />
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              min={product.minOrder}
              defaultValue={product.minOrder}
              onChange={handleCalSubtotal}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <p className="font-bold text-xl">Subtotal:</p>
            <p className="font-bold text-2xl">${subtotal.toFixed(2)}</p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="note">Note</Label>
            <Input
              type="text-area"
              id="note"
              placeholder="Enter your note here"
            />
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
        <CardFooter>
          {/* <Button variant="primary">{`Order`}</Button> */}
          <SendRequest product={product.name} />
        </CardFooter>
      </Card>
    </div>
  );
}
