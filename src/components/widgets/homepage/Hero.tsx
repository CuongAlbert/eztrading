import { Button } from "@/components/common";
import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import React from "react";

export const Hero = () => {
  return (
    <section className="relative md:-mt-[76px] not-prose">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-0 md:pt-[76px] pointer-events-none"></div>
        <div className="py-12 md:py-20">
          <div className="text-center pb-10 md:pb-16 max-w-5xl mx-auto">
            <p className="text-base text-blue-12 font-bold tracking-wide uppercase">
              EZHOUZE
            </p>

            <div className="w-full flex flex-col">
              <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter font-heading text-violet-700">
                Healthy Homes,
              </h1>
              <h1 className="text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading">
                Healthy Investment,
              </h1>
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-slate-500 mb-6">
                Total Home Protection & Management For Your Peace of Mind
              </p>

              <div className="max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center items-center gap-4">
                <Link
                  className="flex w-full sm:w-auto items-center justify-center"
                  href="#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave"
                >
                  <Button variant="primary">
                    Subscribe for early bird offer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="relative m-auto max-w-5xl">
              <Image
                src="/home-images/home-cover.avif"
                alt="Health Home, Healthy Investment"
                width={1024}
                height={576}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
