import {
  getProductByCategory,
  getProductBySlug,
  getProductsByProvider,
} from "@/server/products";

import LeadTime from "@/components/widgets/productDetail/LeadTime";
import { PRODUCTS } from "@/config/productData";
import { Product } from "@/types/product";
import ProductInfor from "@/components/widgets/productDetail/ProductInfor";
import ProductView from "@/components/widgets/productDetail/ProductView";
import PurchaseBox from "@/components/widgets/productDetail/PurchaseBox";
import React from "react";
import Recommendation from "@/components/widgets/productDetail/Recommendation";
import Reviews from "@/components/widgets/reviews/reviews";
import Sample from "@/components/widgets/productDetail/Sample";
import { getReviewsByProductId } from "@/server/reviews";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const pData = await getProductBySlug(params.slug);
  const pProduct = await getProductsByProvider(pData.provider);
  const cate = pData.category.split(",").map((c) => c.trim());
  let pCates: Product[] = [];
  for (let i = 0; i < cate.length; i++) {
    let product = await getProductByCategory(cate[i]);
    pCates = [...pCates, ...product];
  }
  const reviews = await getReviewsByProductId(pData.id.toString());
  console.log("Provider:", pData);
  console.log("Product category:", pCates);
  const providerList = pProduct.filter((p) => p.id !== pData.id);
  const categoryList = pCates.filter(
    (pc) => pc.id !== pData.id && pc.provider !== pData.provider,
  );

  return (
    <div className="flex w-full max-w-[84rem] justify-between mx-auto py-8 px-4 lg:px-0 relative">
      <div className="w-full lg:w-[60%] px-4 lg:px-0 space-y-8">
        <div className="w-full flex flex-col gap-2">
          <h1 className="font-medium text-2xl">{pData.name}</h1>
          <p>No reviewed yet</p>
        </div>

        <div className="w-full lg:hidden">
          <PurchaseBox product={pData} />
        </div>
        <ProductView images={pData.images} />
        <Recommendation list={providerList} title="More from this shop" />
        <Recommendation list={categoryList} title="You may also like" />

        <div className="w-full h-[1px] bg-slate-200" />
        <ProductInfor attributes={pData.attributes} other={false} />
        {/* <ProductInfor attributes={pData.attributes} other={true} /> */}

        <LeadTime leadTime={pData.leadTime} unit={pData.unit} />
        <Sample sample={pData.sample} unit={pData.unit} product={pData.name} />
        <div className="w-full h-[1px] bg-slate-200" />
        <Reviews initReviews={reviews} productId={pData.id.toString()} />
      </div>
      <div className="w-[40%] hidden lg:block space-y-8 p-4 lg:p-8 lg:space-y-16 mx-auto">
        <PurchaseBox product={pData} />
      </div>
    </div>
  );
}
