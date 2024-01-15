import Filter from "@/components/widgets/productList/Filter";
import List from "@/components/widgets/productList/List";
import React from "react";

export default function ProductList() {
  return (
    <div className="flex">
      <div className="w-[15%]">
        <Filter />
      </div>
      <div className="w-[80%]">
        <List />
      </div>
    </div>
  );
}
