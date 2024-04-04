"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { Logo, ToggleMenu } from "@/components/common";
import { UserButton, useUser } from "@clerk/nextjs";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "@/config/i18n-navigation";
import LocaleSwitcher from "../../widgets/common/LocaleSwitcher";
import React from "react";
import { usePathname } from "next/navigation";

interface LinkType {
  text: string;
  href: string;
}
interface MenuLink extends LinkType {
  links?: Array<MenuLink>;
}

interface ActionLinks {
  text: string;
  href: string;
}

export interface HeaderProps {
  links?: MenuLink[];
  actions?: ActionLinks[];
  children?: React.ReactNode;
}

const HeaderContent = ({ links = [], actions = [], children }: HeaderProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const pathName = usePathname();
  return (
    <header className="top-0 z-10 flex-none mx-auto w-full border-b border-gray-50/0 transition-[opacity] ease-in-out sticky bg-slate-50">
      <div className="py-3 px-3 md:px-6 mx-auto w-full flex justify-between">
        <div className="flex justify-between">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          {/* </a> */}
          <div className="flex items-center md:hidden bg-red-500">
            <ToggleMenu />
          </div>
        </div>

        <div className="flex gap-2 shrink-0 justify-center items-center">
          {children}
          <div className="items-center flex justify-between gap-2 w-full md:w-auto">
            {actions?.length ? (
              <span className="ml-4 rtl:ml-0 rtl:mr-4">
                {!isLoaded ? (
                  <span className="loading loading-spinner"></span>
                ) : isSignedIn ? (
                  <div className="flex gap-4 justify-center items-center">
                    <UserButton afterSignOutUrl="/" />
                    <Link
                      href="/provider/my-profile"
                      className="text-blue-12 hover:text-blue-11 whitespace-nowrap"
                    >
                      Pro Portal
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      className="hover:text-blue-11 font-medium"
                      href="/sign-in"
                    >
                      Sign in
                    </Link>
                    <Link href="/join-as-pro">
                      <button className="btn btn-primary">Join as pro</button>
                    </Link>
                  </div>
                )}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <HamburguerMenu>
          <nav className="w-full items-center justify-center gap-4 flex-col flex">
            {links.map(({ text, href }) => (
              <Link
                key={text}
                href={href}
                className={`hover:text-blue-10 px-4 py-3 text-lg flex items-center font-medium ${
                  href === pathName ? "text-blue-10" : ""
                }`}
              >
                {text}
              </Link>
            ))}
          </nav>
        </HamburguerMenu>
      </div>
    </header>
  );
};

export default HeaderContent;

const HamburguerMenu = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="p-2 flex md:hidden cursor-pointer">
          <Bars3Icon className="w-6 h-6 text-slate-12" />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-12/30 backdrop-blur-lg w-full h-full fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};