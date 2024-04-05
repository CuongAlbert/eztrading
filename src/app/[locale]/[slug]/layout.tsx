import { NextIntlClientProvider, useMessages } from "next-intl";

import Header from "@/components/ui/Header";
import React from "react";
import { headerData } from "@/config/navigation";
import pick from "lodash/pick";

const ProductListLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, "product-detail")}>
      <div className="bg-slate-50 relative">
        <Header links={headerData.links} actions={headerData.actions} />
        {children}
      </div>
    </NextIntlClientProvider>
  );
};

export default ProductListLayout;
