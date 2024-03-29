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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductList() {
  const { displayProducts } = useContext(SearchResultContext);

  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col gap-8 mx-auto">
        <div className="w-full flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center mb-16">
          <p className="mx-auto font-medium text-muted-foreground">
            Or click to search top products
          </p>
          <div className="flex gap-2 flex-wrap items-center justify-center">
            <Button
              variant="ghost"
              asChild
              className="rounded-full bg-slate-50/30 backdrop-blur-md "
            >
              <Link href={`/search`}>All product</Link>
            </Button>
            {["garden tool", "home decor", "custom decor"].map(
              (item, index) => (
                <Button
                  variant="ghost"
                  key={index}
                  asChild
                  className="rounded-full bg-slate-50/30 backdrop-blur-md "
                >
                  <Link href={`/search?kwd=${item}`}>{item}</Link>
                </Button>
              ),
            )}
          </div>
        </div>
        <Filter />
        <List products={displayProducts} />
        <div className="w-[15%]"></div>
      </main>
    </>
  );
}
