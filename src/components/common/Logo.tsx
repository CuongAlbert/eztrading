import EzTradingLogo from "@/assets/eztrading-logo.png";
import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <span className="self-center flex justify-center items-center ml-2 rtl:ml-0 rtl:mr-2 text-2xl md:text-3xl gap-3 font-bold whitespace-nowrap ">
      <div className="relative h-12 w-36">
        <Image
          src={EzTradingLogo}
          alt="EZTrading logo"
          fill
          className="rounded-md"
          sizes="(max-width: 0px) 100px, (max-width: 0px) 100px, 100px"
        />
      </div>
      {/* <p className="hidden lg:block text-primary text-2xl">EZTRADING</p> */}
    </span>
  );
};
