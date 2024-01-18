"use client";
import React from "react";
import Header from "@/components/ui/Header";
import { providerHeader } from "@/config/navigation";
import { ProviderSettingsProvider } from "@/ctx/ProviderSettings";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header links={providerHeader.links} actions={providerHeader.actions} />
      <ProviderSettingsProvider>{children}</ProviderSettingsProvider>
    </>
  );
};

export default ProviderLayout;
