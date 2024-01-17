"use client";
import React, { createContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/widgets/common";
import { searchProducts, getProductBySlug } from "@/server/products";
import { Product } from "@/types/product";

type SearchResultContextType = {
  products: Product[];
};

export const SearchResultContext = createContext<SearchResultContextType>({
  products: [],
});

export const SearchResultProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("kwd");
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await searchProducts(search ? search : "");
        setProducts(products);
        setIsLoading(false);
      } catch (err) {
        router.push("/");
      }
    };
    fetchData();
  }, [search, router]);

  if (isLoading) return <Loading />;

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-slate-11">No Product Found</h1>
        <button
          className="btn btn-primary mt-4"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <SearchResultContext.Provider value={{ products }}>
      {children}
    </SearchResultContext.Provider>
  );
};
