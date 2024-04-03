import {
  getProductByCategory,
  getProductBySlug,
  getProductsByProvider,
} from "@/server/products";

import Image from "next/image";
import LeadTime from "@/components/widgets/productDetail/LeadTime";
import Link from "next/link";
import { PRODUCTS } from "@/config/productData";
import { Product } from "@/types/product";
import ProductInfor from "@/components/widgets/productDetail/ProductInfor";
import ProductView from "@/components/widgets/productDetail/ProductView";
import PurchaseBox from "@/components/widgets/productDetail/PurchaseBox";
import { Rating } from "@smastrom/react-rating";
import React from "react";
import Recommendation from "@/components/widgets/productDetail/Recommendation";
import Reviews from "@/components/widgets/reviews/reviews";
import Sample from "@/components/widgets/productDetail/Sample";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { calculateAverageRating } from "@/lib/helpers";
import { getProvidersById } from "@/server/providers";
import { getReviewsByProductId } from "@/server/reviews";
import { urlFor } from "@/server/SanityClient";

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
  const provider = await getProvidersById(pData.provider);

  console.log("Provider:", provider);

  const { avgRating, totalReviews } = calculateAverageRating(reviews);

  return (
    <div className="flex w-full max-w-[84rem] justify-between mx-auto py-8 px-4 lg:px-0 relative">
      <div className="w-full lg:w-[60%] px-4 lg:px-0 space-y-8">
        <div className="w-full flex flex-col gap-4">
          <h1 className="font-bold text-2xl">{pData.name}</h1>
          {totalReviews > 0 ? (
            <div className="flex items-center gap-2 w-full">
              <Rating value={avgRating} readOnly style={{ maxWidth: 105 }} />
              <p className="font-medium">{avgRating}</p>
              <Link
                href="#reviews"
                className="w-full underline text-slate-500 hover:text-slate-900"
              >{` (${totalReviews} reviews)`}</Link>
            </div>
          ) : (
            <p>No reviewed yet</p>
          )}
          <div className="flex gap-2 items-center p-2 bg-blue-100 rounded-md">
            {provider.logo && (
              <div className="w-8 h-8 relative rounded-md overflow-clip">
                <Image
                  fill
                  src={urlFor(provider.logo).width(24).height(24).url()}
                  alt={provider.company}
                  className="object-contain"
                  sizes="(max-width: 0px) 32px, (max-width: 0px) 32px, 32px"
                />
              </div>
            )}
            <p className="font-medium">{provider.company}</p>
            {provider.verified && (
              <>
                <p>-</p>

                <div className="flex gap-1 items-center">
                  <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                  <p className="font-medium">Verified</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full lg:hidden">
          <PurchaseBox product={pData} />
        </div>
        <ProductView images={pData.images} />
        <Recommendation list={providerList} title="More from this shop" />
        <Recommendation list={categoryList} title="You may also like" />

        {/* <div className="w-full h-[1px] bg-slate-200" /> */}
        <ProductInfor attributes={pData.attributes} other={false} />
        {/* <ProductInfor attributes={pData.attributes} other={true} /> */}
        {/* <div className="w-full h-[1px] bg-slate-200" /> */}
        <LeadTime leadTime={pData.leadTime} unit={pData.unit} />
        {/* <div className="w-full h-[1px] bg-slate-200" /> */}
        <Sample sample={pData.sample} unit={pData.unit} product={pData.name} />
        <div className="w-full h-[1px] bg-slate-200" />
        <Reviews initReviews={reviews} productId={pData.id.toString()} />
      </div>
      <div className="w-[40%] hidden lg:block space-y-8 p-4 lg:p-8 lg:space-y-16 mx-auto">
        <PurchaseBox
          product={pData}
          shipping={provider.shipping}
          payment={provider.paymentTerms}
        />
      </div>
    </div>
  );
}
