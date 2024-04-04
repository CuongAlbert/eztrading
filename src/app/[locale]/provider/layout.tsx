"use client";

import Header from "@/components/ui/Header";
import { ProviderSettingsProvider } from "@/ctx/ProviderSettings";
import React from "react";
import { providerHeader } from "@/config/navigation";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header links={providerHeader.links} actions={providerHeader.actions} />
      <ProviderSettingsProvider>{children}</ProviderSettingsProvider>
    </>
  );
};

export default ProviderLayout;
