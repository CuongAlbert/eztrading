import React from "react";
import Image from "next/image";

export const Logo = () => {
  return (
    <span className="self-center flex justify-center items-center ml-2 rtl:ml-0 rtl:mr-2 text-2xl md:text-3xl gap-3 font-bold whitespace-nowrap ">
      <div className="relative w-10 h-10">
        {/* <Image
          src={"/images/logo.png"}
          alt="EZHOUZE logo"
          fill
          className="rounded-md"
          sizes="(max-width: 0px) 100px, (max-width: 0px) 100px, 100px"
        /> */}
      </div>
      <p className="hidden lg:block text-primary text-2xl">EZTRADING</p>
    </span>
  );
};
