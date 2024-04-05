import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import React from "react";
import { StaticImageData } from "next/image";
import { buttonVariants } from "@/components/ui/button";

export const ExpansionServicesItem = ({
  title,
  image,
  children,
  label,
}: React.PropsWithChildren<{
  title: string;
  image: StaticImageData;
  children: React.ReactNode;
  label: string;
}>) => {
  return (
    <div className="flex flex-col rounded-xl bg-slate-50/30 backdrop-blur-md border-border border relative overflow-clip">
      <Image
        src={image}
        alt="Hero"
        fill
        className="object-cover"
        sizes="100%"
      />
      <div className="w-full h-full bg-green-950/80 flex p-8 gap-6 flex-col top-0 left-0 z-10">
        <h2 className="text-2xl font-bold text-orange-500">{title}</h2>
        <div className="text-primary-foreground">{children}</div>
        <div className="w-full flex justify-center">
          <Link
            href="#tally-open=3N67JB&tally-layout=modal&tally-emoji-animation=none"
            className={buttonVariants({ className: "max-w-fit" })}
          >
            {label}
          </Link>
        </div>
      </div>
    </div>
  );
};
