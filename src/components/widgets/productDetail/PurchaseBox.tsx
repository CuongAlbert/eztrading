"use client";
import { Button } from "@/components/common";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function PurchaseBox(props: { product: Product }) {
  const product = props.product;
  return (
    <div className="flex flex-col sticky h-[80vh] top-2 ">
      <Card className="mx-auto my-2 w-full">
        <CardContent className="flex flex-col gap-8 py-8">
          <div className="w-full flex flex-col gap-2">
            <Label>Price</Label>
            <p className="font-bold text-xl">{product.price}</p>
          </div>
          {/* <hr className="text-blue-600" /> */}
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              // className="border-2 border-blue-900 rounded-full w-20 py-2 px-3"
              min={product.minOrder}
              defaultValue={product.minOrder}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="note">Note</Label>
            <Input
              type="text-area"
              id="note"
              // className="border-2 border-blue-900 rounded-full w-20 py-2 px-3"
              placeholder="Enter your note here"
            />
          </div>

          {/* </div>
          <hr className="text-blue-600" />
          <h1 className="font-bold">Membership Benifits</h1>
          <div className="flex gap-1">
          <p>{`US $${100} coupons`}</p>
          <Link href={"./"} className="underline">
          View more
          </Link>
          </div>
          <hr className="text-blue-600" />
        <h1 className="font-bold">Purchase Detail</h1> */}
        </CardContent>
        <CardFooter>
          <Button variant="primary">{`Order`}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
