import HeaderContent, { HeaderProps } from "./HeaderContent";

import LocaleSwitcher from "@/components/widgets/common/LocaleSwitcher";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import pick from "lodash/pick";

const Header = ({ links, actions, locale }: HeaderProps) => {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      messages={pick(messages, ["header", "provider-header"])}
    >
      <HeaderContent links={links} actions={actions} locale={locale}>
        <LocaleSwitcher />
      </HeaderContent>
    </NextIntlClientProvider>
  );
};

export default Header;
