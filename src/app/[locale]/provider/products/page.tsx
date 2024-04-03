"use client";

import {
  CheckBadgeIcon,
  ClockIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { InfoEdit, LogoEdit } from "@/components/widgets/provider-myprofile";
import React, { useContext } from "react";

import { Button } from "@/components/common";
import { Link } from "@/config/i18n-navigation";
import List from "@/components/widgets/productList/List";
import { ProviderSettingsContext } from "@/ctx/ProviderSettings";

const ProviderMyProfile = () => {
  const { provider, products } = useContext(ProviderSettingsContext);
  return (
    <div className="block mx-auto max-w-4xl w-full py-4">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col md:flex-row w-full justify-between items-center">
          <h1 className="text-2xl font-medium mb-2">{`You have ${products.length} products`}</h1>
          <Link
            className="btn btn-primary w-full md:w-auto"
            href={`/provider/products/new-product`}
          >
            New Product
          </Link>
        </div>
        <List products={products} />
      </div>
    </div>
  );
};

export default ProviderMyProfile;
