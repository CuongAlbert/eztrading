import Filter from "@/components/widgets/productList/Filter";
import List from "@/components/widgets/productList/List";
import React from "react";
import { searchProducts, getProductBySlug } from "@/server/products";

export default async function ProductList() {
  const products = await searchProducts("clocks luxury");
  const product = await getProductBySlug(
    "most-popular-house-shape-home-decor-custom-movement-wall-clocks1705477476919",
  );
  console.log("Test search", products);
  console.log("Test get product by slug", product);

  return (
    <div className="flex">
      <div className="w-[15%]">
        <Filter />
      </div>
      <div className="w-[80%]">
        <List />
      </div>
    </div>
  );
}
