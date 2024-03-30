import ProductView from "@/components/widgets/productDetail/ProductView";
import React from "react";
import { PRODUCTS } from "@/config/productData";
import Recommendation from "@/components/widgets/productDetail/Recommendation";
import PurchaseBox from "@/components/widgets/productDetail/PurchaseBox";
import ProductInfor from "@/components/widgets/productDetail/ProductInfor";
import LeadTime from "@/components/widgets/productDetail/LeadTime";
import Sample from "@/components/widgets/productDetail/Sample";
import {
  getProductByCategory,
  getProductBySlug,
  getProductsByProvider,
} from "@/server/products";
import { Product } from "@/types/product";

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
  console.log("Provider:", pData);
  console.log("Product category:", pCates);
  const providerList = pProduct.filter((p) => p.id !== pData.id);
  const categoryList = pCates.filter(
    (pc) => pc.id !== pData.id && pc.provider !== pData.provider,
  );

  return (
    <div className="flex w-full max-w-[84rem] gap-4 md:gap-8 justify-between mx-auto py-8">
      <div className="w-full lg:w-[60%] lg:ml-3 px-4 lg:px-0 space-y-8 lg:space-y-16">
        <h1 className="font-medium text-2xl lg:ml-10">{pData.name}</h1>
        <div className="w-full lg:hidden">
          <PurchaseBox product={pData} />
        </div>
        <ProductView images={pData.images} />
        <Recommendation list={providerList} title="More from this shop" />
        <Recommendation list={categoryList} title="You may also like" />

        <ProductInfor attributes={pData.attributes} other={false} />
        {/* <ProductInfor attributes={pData.attributes} other={true} /> */}

        <LeadTime leadTime={pData.leadTime} unit={pData.unit} />
        <Sample sample={pData.sample} unit={pData.unit} product={pData.name} />
      </div>
      <div className="w-[40%] hidden lg:block space-y-8 p-4 lg:p-8 lg:space-y-16 mx-auto">
        <PurchaseBox product={pData} />
      </div>
    </div>
  );
}
