"use client";
import React, { createContext, useEffect } from "react";

import { useUser } from "@clerk/nextjs";
import { ProviderInfo } from "@/types/provider";
import { useRouter } from "@/config/i18n-navigation";
import { getProviderByAuthProviderId } from "@/server/providers";
import { Loading } from "@/components/widgets/common";
import { Product } from "@/types/product";
import { getProductsByProvider } from "@/server/products";

type ProviderSettingsContextType = {
  provider: ProviderInfo;
  products: Product[];
};

export const ProviderSettingsContext =
  createContext<ProviderSettingsContextType>({
    provider: {} as ProviderInfo,
    products: [] as Product[],
  });

export const ProviderSettingsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [provider, setProvider] = React.useState<any | null>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const provider = await getProviderByAuthProviderId(user.id);
        const products = await getProductsByProvider(provider.id);
        setProducts(products);
        setProvider(provider);
        setIsLoading(false);
      } catch (err) {
        router.push("/");
      }
    };
    fetchData();
  }, [user, router]);
  if (!isLoaded) return;
  if (!isSignedIn) {
    router.push("/pro-signin");
  }

  if (isLoading) return <Loading />;

  if (!provider) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-slate-11">No Provider Found</h1>
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
    <ProviderSettingsContext.Provider value={{ provider, products }}>
      {children}
    </ProviderSettingsContext.Provider>
  );
};
