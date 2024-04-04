import HeaderContent, { HeaderProps } from "./HeaderContent";

import LocaleSwitcher from "@/components/widgets/common/LocaleSwitcher";
import React from "react";

const Header = ({ links, actions }: HeaderProps) => {
  return (
    <HeaderContent links={links} actions={actions}>
      <LocaleSwitcher />
    </HeaderContent>
  );
};

export default Header;
