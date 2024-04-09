"use client";

import { ChangeEvent, ReactNode, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, locales } from "@/config/i18n-navigation";

import clsx from "clsx";
import { useParams } from "next/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};
export default function LocaleSwitcher() {
  // const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label="Change language">
      {locales.map((cur: string) => (
        <option key={cur} value={cur}>
          {cur === "en" ? `🇺🇸` : `🇻🇳`}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}

function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    // console.log(nextLocale);
    // console.log("params:", params);
    // console.log("pathname:", pathname);
    startTransition(() => {
      router.replace(`${pathname}`, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent outline-none"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
