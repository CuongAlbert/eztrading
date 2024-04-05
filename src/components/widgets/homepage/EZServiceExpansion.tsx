import EzExpansion from "@/assets/images/ezexpansion.webp";
import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const EzServiceExpansion = () => {
  const t = useTranslations("expansion");
  return (
    <section className="w-full max-w-6xl mx-auto  py-24 flex justify-center items-center">
      <div className="flex flex-col justify-center md:gap-4 rounded-xl p-4 lg:p-16 bg-slate-50/30 backdrop-blur-md border-border border relative w-full h-[512px] md:h-[480px] overflow-clip">
        <Image src={EzExpansion} alt="Hero" fill className="object-cover" />
        <div className="w-full h-full flex p-4 lg:p-16 flex-col gap-3 justify-center absolute top-0 left-0 bg-gradient-to-r from-green-950 via-green-950/80 to-transparent to-[120%]">
          <h2 className="text-2xl md:text-4xl font-bold text-orange-500">
            {t("title")}
          </h2>
          <p className="text-muted italic text-sm sm:text-base md:text-lg">
            {t("desc")}
          </p>
          <ul className="list-disc md:text-xl ml-4 mt-2 space-y-2 text-primary-foreground">
            <li>{t("li1")}</li>
            <li>{t("li2")}</li>
            <li>{t("li3")}</li>
            <li>{t("li4")}</li>
          </ul>
          <Link
            href="/ez-business-expansion"
            className={buttonVariants({ className: "max-w-fit mt-2" })}
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
};
