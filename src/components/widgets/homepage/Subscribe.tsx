import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

export const Subscribe = () => {
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6 max-w-4xl rounded-xl p-4 lg:p-16 bg-slate-50/30 backdrop-blur-md border-border border">
        <h2 className="text-2xl text-center md:text-4xl font-bold text-primary">
          Featured Products
        </h2>
        <p className="text-slate-11 md:text-xl text-center">{`Ready to join the Sustainable business revolution? Sign up today for our news and exclusive promotions
`}</p>
        <Link
          href="#tally-open=n9W7Ep&tally-layout=modal&tally-emoji-animation=none"
          className={buttonVariants()}
        >
          Subscribe for early bird offer
        </Link>
      </div>
    </section>
  );
};
