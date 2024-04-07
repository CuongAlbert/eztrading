"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/config/i18n-navigation";

import { Button } from "@/components/ui/button";

interface SearchBarProps {
  default?: string;
  isDark?: boolean;
  lang: { [key: string]: string };
}

export const SearchBar = ({
  default: defaultTerm = "",
  isDark = false,
  lang,
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const [text, setText] = useState<string>(
    searchParams ? searchParams.get("kwd") || defaultTerm : "",
  );
  const { push } = useRouter();
  return (
    <form
      className="w-full max-w-2xl px-2 py-2 flex gap-3 sm:gap-1 justify-between items-center rounded-full border-solid border-2 border-zinc-200"
      onSubmit={(e) => {
        e.preventDefault();
        push(`/search?kwd=${text}`);
      }}
    >
      <input
        className={
          `ml-2 text-lg outline-none w-full bg-transparent` +
          ` ${isDark ? "text-background" : ""}`
        }
        type="text"
        placeholder={lang.placeHolder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <div className="flex gap-1 md:gap-4 justify-around items-center">
        <Button type="submit">{lang.button}</Button>
      </div>
    </form>
  );
};
