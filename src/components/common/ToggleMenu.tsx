import React from "react";

export const ToggleMenu = () => {
  return (
    <button aria-label="Toggle menu" data-aw-toggle-menu>
      <span className="sr-only">Toggle menu</span>
      <span
        // aria-hidden="true"
        className="h-1 w-6 my-1 rounded-full bg-slate-12 transition ease transform duration-200 opacity-80 group-[.expanded]:rotate-45 group-[.expanded]:translate-y-2.5"
      ></span>
      <span
        // aria-hidden="true"
        className="h-1 w-6 my-1 rounded-full bg-slate-12 transition ease transform duration-200 opacity-80 group-[.expanded]:opacity-0"
      ></span>
      <span
        // aria-hidden="true"
        className="h-1 w-6 my-1 rounded-full bg-slate-12 transition ease transform duration-200 opacity-80 group-[.expanded]:-rotate-45 group-[.expanded]:-translate-y-2.5"
      ></span>
    </button>
  );
};
