import React from "react";
import Header from "@/components/ui/Header";
import { headerData } from "@/config/navigation";

const ProductListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      {children}
    </>
  );
};

export default ProductListLayout;
