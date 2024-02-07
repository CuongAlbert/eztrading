import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

export const Subscribe = () => {
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6 max-w-4xl rounded-xl  p-16 bg-slate-50/30 backdrop-blur-md border-border border">
        <h2 className="text-4xl font-bold">News and Promotions</h2>
        <p className="text-slate-11 text-xl text-center">{`Ready to join the Sustainable business revolution? Sign up today for our news and exclusive promotions
`}</p>
        <Link
          href="#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave"
          className={buttonVariants()}
        >
          Subscribe for early bird offer
        </Link>
      </div>
    </section>
  );
};
