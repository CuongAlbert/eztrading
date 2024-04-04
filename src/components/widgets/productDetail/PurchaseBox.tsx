"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Product } from "@/types/product";
import { SendRequest } from "../send-request";
import { useTranslations } from "next-intl";

export default function PurchaseBox(props: {
  product: Product;
  shipping?: string;
  payment?: string;
}) {
  const product = props.product;
  const t = useTranslations("product-detail.purchase-box");
  const calSubTotal = (
    quantity: number,
    priceRecord: { [key: number]: number },
  ): number => {
    const keys = Object.keys(priceRecord)
      .map((key) => parseInt(key))
      .sort((a, b) => a - b);
    let price = 0;
    for (let i = 0; i < keys.length; i++) {
      if (quantity >= keys[i]) {
        price = priceRecord[keys[i]];
      } else {
        break;
      }
    }
    return quantity * price;
  };
  const mapPriceRecordToStructuredFormat = (priceRecord: {
    [key: number]: number;
  }): Array<{ range: string; price: number }> => {
    const keys = Object.keys(priceRecord)
      .map((key) => parseInt(key))
      .sort((a, b) => a - b);
    const structuredFormat = keys.map((key, index) => {
      let range: string;
      if (index < keys.length - 1) {
        range = `${key}-${keys[index + 1] - 1}`;
      } else {
        range = `>=${key}`; // This clearly shows that the range is for key and above
      }
      return { range, price: priceRecord[key] };
    });
    return structuredFormat;
  };
  const [subtotal, setSubtotal] = useState<number>(
    calSubTotal(product.minOrder, product.rawPrice),
  );

  const handleCalSubtotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const qual: number = Number(event.target.value);
    setSubtotal(calSubTotal(qual, product.rawPrice));
  };
  return (
    <div className="flex flex-col lg:sticky top-[122px]">
      <Card className="mx-auto w-full bg-slate-50/50 backdrop-blur-md border-t-4 border-t-green-600 shadow-xl rounded-xl">
        <CardContent className="flex flex-col gap-4 p-6">
          <p className="font-bold text-base">
            {t("price")}
            <span className="font-normal text-sm text-slate-500">
              {t("price-note")}
            </span>
          </p>
          <div className="w-full grid grid-cols-4 gap-2">
            {product.rawPrice && Object.keys(product.rawPrice).length > 0
              ? mapPriceRecordToStructuredFormat(product.rawPrice).map(
                  ({ range, price }) => (
                    <div key={range} className="flex flex-col gap-2">
                      <p className="text-sm">{`${range}`}</p>
                      <p className="font-bold text-xl">
                        {`$${price.toString()}`}
                      </p>
                    </div>
                  ),
                )
              : null}
          </div>
          {/* <div className="w-full h-[1px] bg-slate-200" /> */}
          <hr className="text-blue-600" />
          <div className="w-full flex flex-col gap-2">
            <label className="text-base font-bold" htmlFor="quantity">
              {t("quantity")}
            </label>
            <Input
              type="number"
              id="quantity"
              min={product.minOrder}
              defaultValue={product.minOrder}
              onChange={handleCalSubtotal}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <p className="">{t("estimated-price")}</p>
            <p className="font-medium text-3xl">${subtotal.toFixed(0)}</p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-base font-bold" htmlFor="note">
              {t("note")}
            </label>
            <Input
              type="text-area"
              id="note"
              placeholder={t("note-placeholder")}
            />
          </div>

          <hr className="text-blue-600" />
          <h1 className="font-bold">{t("shipping-policy")}</h1>
          <div className="flex gap-1">
            <p>
              {props.shipping && props.shipping !== ""
                ? props.shipping
                : t("shipping-policy-default")}
            </p>
          </div>
          <hr className="text-blue-600" />
          <h1 className="font-bold">{t("payment-policy")}</h1>
          <div className="flex gap-1">
            <p>
              {props.payment && props.payment !== ""
                ? props.payment
                : t("payment-policy-default")}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button variant="primary">{`Order`}</Button> */}
          <SendRequest product={product.name} />
        </CardFooter>
      </Card>
    </div>
  );
}
