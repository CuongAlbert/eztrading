import {
  EnvelopeSimple,
  FacebookLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import React from "react";

export const About = ({ id }: { id: string }) => {
  return (
    <section
      className="relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center bg-blue-2"
      id={id}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl">
        <div
          className={`flex flex-col gap-4 md:gap-8 lg:gap-16 py-8 md:py-4 md:px-16 md:justify-center items-center md:flex-row-reverse`}
        >
          <div className="w-full md:w-1/2 aspect-square relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/aboutus.avif"
              alt="Health Home, Healthy Investment"
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 432px"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4 mt-8">
            <h2 className="text-3xl font-bold">About us</h2>
            <p className="text-slate-11">{`At EZHOUSE, we emphasize prevention through our thorough home inspection service, aiming to save you money and hassle.

Our expertise includes home inspections, property listings, and home supplies to streamline property management, safeguard your investments, and optimize returns.`}</p>
            <div className="flex gap-4 justify-between">
              <Link
                href="https://www.facebook.com/ezhouzedotca"
                className="flex gap-4 justify-center items-center"
              >
                <FacebookLogo size={32} color="#1d2487" weight="fill" />
                <p className="font-medium">Facebook</p>
              </Link>
              <Link
                href="https://www.linkedin.com/company/ezhouze"
                className="flex gap-4 justify-center items-center"
              >
                <LinkedinLogo size={32} color="#0077B5" weight="fill" />
                <p className="font-medium">Linkedin</p>
              </Link>
              <Link
                href="mailto:info@ezhouze.ca"
                className="flex gap-4 justify-center items-center"
              >
                <EnvelopeSimple size={32} color="#ba5a5a" weight="fill" />
                <p className="font-medium">Email</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
