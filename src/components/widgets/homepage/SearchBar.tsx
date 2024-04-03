"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Link } from "@/config/i18n-navigation";

interface SearchBarProps {
  default?: string;
  isDark?: boolean;
}

export const SearchBar = ({
  default: defaultTerm = "",
  isDark = false,
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
        placeholder="What are you looking for?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <div className="flex gap-1 md:gap-4 justify-around items-center">
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};
