"use client";
import Filter from "@/components/widgets/productList/Filter";
import List from "@/components/widgets/productList/List";
import React, { useContext } from "react";
import { searchProducts, getProductBySlug } from "@/server/products";
import { SearchBar } from "@/components/widgets/homepage";
import { Search } from "lucide-react";

import { SearchResultContext } from "@/ctx/SearchResult";

export default function ProductList() {
  const { products } = useContext(SearchResultContext);
  return (
    <div className="flex">
      <div className="w-[15%]">
        <Filter />
      </div>
      <div className="w-[80%]">
        <SearchBar />
        <List products={products} />
      </div>
    </div>
  );
}
