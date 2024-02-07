import ProductView from "@/components/widgets/productDetail/ProductView";
import React from "react";
import { PRODUCTS } from "@/config/productData";
import Recommendation from "@/components/widgets/productDetail/Recommendation";
import PurchaseBox from "@/components/widgets/productDetail/PurchaseBox";
import ProductInfor from "@/components/widgets/productDetail/ProductInfor";
import LeadTime from "@/components/widgets/productDetail/LeadTime";
import Sample from "@/components/widgets/productDetail/Sample";
import { getProductBySlug } from "@/server/products";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const pData = await getProductBySlug(params.slug);
  console.log(pData);
  return (
    <div className="flex w-full lg:w-[95%] gap-2 md:gap-6 justify-between mx-auto py-8">
      <div className="w-full lg:w-[70%] lg:ml-3 px-4 lg:px-0 space-y-8 lg:space-y-16">
        <h1 className="font-medium text-2xl lg:ml-10">{pData.name}</h1>
        <div className="w-full lg:hidden">
          <PurchaseBox product={pData} />
        </div>
        <ProductView images={pData.images} />
        {/* <Recommendation /> */}

        <ProductInfor attributes={pData.attributes} other={false} />
        {/* <ProductInfor attributes={pData.attributes} other={true} /> */}

        <LeadTime leadTime={pData.leadTime} unit={pData.unit} />
        <Sample sample={pData.sample} unit={pData.unit} product={pData.name} />
      </div>
      <div className="w-[25%] hidden lg:block">
        <PurchaseBox product={pData} />
      </div>
    </div>
  );
}
