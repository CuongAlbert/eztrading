import React from "react";
import Header from "@/components/ui/Header";
import { headerData } from "@/config/navigation";
import { SearchResultProvider } from "@/ctx/SearchResult";

const ProductListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <SearchResultProvider>{children}</SearchResultProvider>
    </>
  );
};

export default ProductListLayout;
