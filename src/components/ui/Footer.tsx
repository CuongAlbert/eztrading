import { Link } from "@/config/i18n-navigation";
import { Logo } from "../common";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export const Footer = () => {
  // unstable_setRequestLocale(locale);
  const t = useTranslations("footer");
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 justify-center items-center border border-t-slate-5">
      <footer className="flex w-full flex-col md:flex-row gap-8 md:gap-16 justify-center">
        <aside>
          <Logo />
        </aside>
        {/* <nav className="flex-col flex gap-2">
          <header className="font-bold">Services</header>
          <Link className="" href="/consultants">
            Settle Buddies
          </Link>
          <Link className="" href="/packages">
            Settle Care
          </Link>
          <Link className="" href="/tips-and-guides">
            Settle Tips
          </Link>
        </nav> */}
        <nav className="flex-col flex gap-2">
          <header className="font-bold">{t("company")}</header>
          <Link className="" href="/#about">
            {t("about-us")}
          </Link>
          <Link className="" href="/#contact">
            {t("contact")}
          </Link>
        </nav>
        <nav className="flex-col flex gap-2">
          <header className="font-bold">{t("legal")}</header>
          <Link className="" href="/">
            {t("terms")}
          </Link>
          <Link className="" href="/privacy-policy">
            {t("policy")}
          </Link>
        </nav>
      </footer>
      <div>
        <span className="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://www.rezza.io/favicon.ico)]"></span>
        Power by{" "}
        <Link
          className="text-blue-600 hover:underline"
          href="https://rezza.io/"
        >
          Rezza.
        </Link>{" "}
        Copyright © Open Momentum Technologies Ltd · All rights reserved.
      </div>
    </section>
  );
};
