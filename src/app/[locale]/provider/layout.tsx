import Header from "@/components/ui/Header";
import { ProviderSettingsProvider } from "@/ctx/ProviderSettings";
import React from "react";
import { providerHeader } from "@/config/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";

const ProviderLayout = ({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) => {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <>
      <Header links={providerHeader.links} actions={providerHeader.actions} />
      <ProviderSettingsProvider>
        <NextIntlClientProvider messages={pick(messages, "provider")}>
          {children}
        </NextIntlClientProvider>
      </ProviderSettingsProvider>
    </>
  );
};

export default ProviderLayout;
