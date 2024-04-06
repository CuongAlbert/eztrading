import React from "react";

import { SearchResultProvider } from "@/ctx/SearchResult";
import Header from "@/components/ui/Header";
import { headerData } from "@/config/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";

const ProductListLayout = ({
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
      <SearchResultProvider>
        <Header
          links={headerData.links}
          actions={headerData.actions}
          locale={locale}
        />
        <NextIntlClientProvider messages={pick(messages, "Search")}>
          {children}
        </NextIntlClientProvider>
      </SearchResultProvider>
    </>
  );
};

export default ProductListLayout;
