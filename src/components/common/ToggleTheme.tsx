"use client";
import React from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="text-slate-10  hover:bg-slate-2 focus:outline-none focus:ring-4 focus:ring-slate-2 rounded-lg text-sm p-2.5 inline-flex items-center"
      aria-label="Toggle between Dark and Light mode"
      data-aw-toggle-color-scheme
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="w-6 h-6 md:w-5 md:h-5 md:inline-block" />
    </button>
  );
};
