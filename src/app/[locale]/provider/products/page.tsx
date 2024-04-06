"use client";
import React, { useContext } from "react";

import { Button } from "@/components/common";
import { Link } from "@/config/i18n-navigation";
import List from "@/components/widgets/productList/List";
import { ProviderSettingsContext } from "@/ctx/ProviderSettings";
import { useTranslations } from "next-intl";

const ProviderMyProfile = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const t = useTranslations("provider");
  const { provider, products } = useContext(ProviderSettingsContext);
  return (
    <div className="block mx-auto max-w-4xl w-full py-4">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col md:flex-row w-full justify-between items-center">
          <h1 className="text-2xl font-medium mb-2">{`${t(
            "products.title-head",
          )} ${products.length} ${t("products.title-tail")}`}</h1>
          <Link
            className="btn btn-primary w-full md:w-auto"
            href={`/provider/products/new-product`}
          >
            {t("products.new-product")}
          </Link>
        </div>
        <List products={products} />
      </div>
    </div>
  );
};

export default ProviderMyProfile;
