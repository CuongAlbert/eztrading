"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchBarProps {
  default?: string;
}

export const SearchBar = ({ default: defaultTerm = "" }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const [text, setText] = useState<string>(
    searchParams ? searchParams.get("kwd") || defaultTerm : "",
  );
  const { replace } = useRouter();
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("kwd", term);
    } else {
      params.delete("kwd");
    }
    replace(`/search?${params.toString()}`);
  };
  return (
    <form
      className="w-full max-w-2xl px-2 py-2 flex gap-3 sm:gap-1 justify-between items-center rounded-full border-solid border-2 border-zinc-200"
      onSubmit={() => handleSearch(text)}
    >
      <input
        className="ml-2 text-lg outline-none w-full bg-transparent"
        type="text"
        placeholder="What are you looking for?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <div className="flex gap-1 md:gap-4 justify-around items-center">
        {/* <CameraIcon className="w-6 h-6" /> */}
        <Button onClick={() => handleSearch(text)}>Search</Button>
        {/* <button type="submit">Search</button> */}
      </div>
    </form>
  );
};
