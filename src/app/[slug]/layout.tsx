import Header from "@/components/ui/Header";
import React from "react";
import { headerData } from "@/config/navigation";

const ProductListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-50">
      <Header links={headerData.links} actions={headerData.actions} />
      {children}
    </div>
  );
};

export default ProductListLayout;
