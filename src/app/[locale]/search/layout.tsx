import React from "react";

import { SearchResultProvider } from "@/ctx/SearchResult";

const ProductListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchResultProvider>{children}</SearchResultProvider>
    </>
  );
};

export default ProductListLayout;
