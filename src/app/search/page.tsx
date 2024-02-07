"use client";
import Filter from "@/components/widgets/productList/Filter";
import List from "@/components/widgets/productList/List";
import React, { useContext } from "react";
import { searchProducts, getProductBySlug } from "@/server/products";
import { SearchBar } from "@/components/widgets/homepage";
import { Search } from "lucide-react";
import Header from "@/components/ui/Header";
import { headerData } from "@/config/navigation";

import { SearchResultContext } from "@/ctx/SearchResult";

export default function ProductList() {
  const { displayProducts } = useContext(SearchResultContext);

  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col gap-8 mx-auto">
        <div className="w-full flex items-center justify-center">
          <SearchBar />
        </div>
        <Filter />
        <List products={displayProducts} />
        <div className="w-[15%]"></div>
      </main>
    </>
  );
}
