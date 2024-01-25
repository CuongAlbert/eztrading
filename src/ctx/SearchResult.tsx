"use client";
import React, { createContext, use, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/widgets/common";
import { searchProducts, getProductBySlug } from "@/server/products";
import { Product } from "@/types/product";
import { result } from "lodash";

type FilterCriteria = {
  minOrder: number;
  category: string;
  minPrice: number;
  maxPrice: number;
};

type SearchResultContextType = {
  // products: Product[];
  categoriesList: string[];
  filterCriteria: FilterCriteria;
  // setFilterCriteria: React.Dispatch<React.SetStateAction<FilterCriteria>>;
  filterProducts: (criteria: FilterCriteria) => void;
  displayProducts: Product[];
};

export const SearchResultContext = createContext<SearchResultContextType>({
  // products: [],
  categoriesList: [],
  filterCriteria: {
    minOrder: 0,
    category: "",
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  },
  // setFilterCriteria: () => {},
  filterProducts: () => {},
  displayProducts: [],
});

export const SearchResultProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("kwd");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] =
    React.useState<Product[]>(products); //filtered products
  const [categoriesList, setCategoriesList] = React.useState<string[]>([]);
  const [filterCriteria, setFilterCriteria] = React.useState({
    minOrder: 0,
    category: "",
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
  });

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const filterProducts = useCallback(
    (criteria: FilterCriteria) => {
      const { minOrder, category, minPrice, maxPrice } = criteria;

      const filteredProducts = products.filter((product) => {
        //parse product price string $xx - $yy to minPrice = xx, maxPrice = yy
        const result = product.price.split(" - ");
        const pMinPrice = result[0] ? Number(result[0].replace("$", "")) : 0;
        const pMaxPrice = result[1]
          ? Number(result[1].replace("$", ""))
          : Number.MAX_SAFE_INTEGER;

        return (
          product.minOrder >= minOrder &&
          product.category.includes(category) &&
          pMaxPrice >= minPrice &&
          pMinPrice <= maxPrice
        );
      });
      console.log("filtered", filteredProducts);
      setDisplayProducts(filteredProducts);
    },
    [products],
  );

  // useEffect(() => {
  //   setDisplayProducts(filterProducts(filterCriteria));
  // }, [filterCriteria, filterProducts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await searchProducts(search ? search : "");
        //const cates = products.map((product) => product.category);
        const cates: string[] = [];
        products.forEach((product) => {
          const pCates = product.category.split(",");

          pCates.forEach((cate) => {
            const cleanCate = cate.trim();
            if (!cates.includes(cleanCate)) cates.push(cleanCate);
          });
        });
        console.log(cates);

        setCategoriesList(cates);
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
    <SearchResultContext.Provider
      value={{
        displayProducts,
        categoriesList,
        filterCriteria,
        filterProducts,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};
