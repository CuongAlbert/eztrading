"use client";

import React, { useContext } from "react";
import { getProductBySlug, searchProducts } from "@/server/products";

import { Button } from "@/components/ui/button";
import Filter from "@/components/widgets/productList/Filter";
import { Link } from "@/config/i18n-navigation";
import List from "@/components/widgets/productList/List";
import { Search } from "lucide-react";
import { SearchBar } from "@/components/widgets/homepage";
import { SearchResultContext } from "@/ctx/SearchResult";
import { useTranslations } from "next-intl";

export default function ProductList() {
  const { displayProducts } = useContext(SearchResultContext);
  const t = useTranslations("Search");

  return (
    <>
      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col gap-8 mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <SearchBar
            lang={{
              placeHolder: t("place-holder"),
              button: t("button.search"),
            }}
          />
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <p className="mx-auto font-medium text-muted-foreground">
              {t("title")}
            </p>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <Button
                variant="outline"
                asChild
                className="rounded-full bg-slate-50/30 backdrop-blur-md "
              >
                <Link href={`/search`}>All product</Link>
              </Button>
              {["garden tool", "home decor", "custom decor"].map(
                (item, index) => (
                  <Button
                    variant="outline"
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
        </div>
        <Filter
          lang={{
            category: t("filter.category"),
            country: t("filter.country"),
            price: t("filter.price"),
            min: t("filter.min"),
            max: t("filter.max"),
            minOrder: t("filter.min-order"),
          }}
        />
        <List products={displayProducts} />
        <div className="w-[15%]"></div>
      </main>
    </>
  );
}
