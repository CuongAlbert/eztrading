"use client";
import ProductView from "@/components/widgets/productDetail/ProductView";
import React, { useState } from "react";
import { PRODUCTS } from "@/config/productData";
import Recommendation from "@/components/widgets/productDetail/Recommendation";
import PurchaseBox from "@/components/widgets/productDetail/PurchaseBox";
import ProductInfor from "@/components/widgets/productDetail/ProductInfor";
import LeadTime from "@/components/widgets/productDetail/LeadTime";
import Sample from "@/components/widgets/productDetail/Sample";

export default function ProductDetail() {
  const pData = PRODUCTS[0];
  return (
    <div className="flex w-[95%] gap-2 md:gap-6 justify-between mx-auto">
      <div className="w-[70%] ml-3">
        <h1 className="font-bold text-lg ml-10">{pData.name}</h1>
        <ProductView images={pData.images} />
        <Recommendation />
        <hr className="text-blue-600 ml-8 my-4" />
        <ProductInfor attributes={pData.attributes} other={false} />
        <ProductInfor attributes={pData.attributes} other={true} />
        <hr className="text-blue-600 ml-8 my-4" />
        <LeadTime leadTime={pData.leadTime} unit={pData.unit} />
        <Sample sample={pData.sample} unit={pData.unit} />
      </div>
      <div className="w-[25%]">
        <PurchaseBox product={pData} />
      </div>
    </div>
  );
}
