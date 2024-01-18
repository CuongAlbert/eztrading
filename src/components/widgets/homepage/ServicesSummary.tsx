import { Toolbox, CurrencyCircleDollar } from "@phosphor-icons/react/dist/ssr";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Icon } from "@phosphor-icons/react/dist/lib/types";
import React from "react";

const SERVICES = [
  {
    title: "EZPROTECT",
    desc: "Shield your property from potential long-term expenses with our comprehensive home protection services",
    icon: {
      iconComp: ShieldCheck,
      color: "#072c09",
    },
  },
  {
    title: "EZSUPPLIES",
    desc: `Where your home needs meet unparalleled variety. We've curated a home supplies store like no other, featuring everything you require.`,
    icon: {
      iconComp: Toolbox,
      color: "#34238b",
    },
  },
  {
    title: "EZLIST",
    desc: "Your go-to online listing service for effortless property sales and rentals.",
    icon: {
      iconComp: CurrencyCircleDollar,
      color: "#e6b633",
    },
  },
];

export const ServicesSummary = () => {
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 py-24 bg-blue-2 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center">
          What services do we provide?
        </h1>

        <p className="text-xl text-slate-11 mb-6 text-center">
          We offer a range of services to help you protect your home and
          investment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServicesItem
              key={service.title}
              title={service.title}
              desc={service.desc}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesItem = ({
  title,
  desc,
  icon,
}: React.PropsWithChildren<{
  title: string;
  desc: string;
  icon: {
    iconComp: Icon;
    color: string;
  };
}>) => {
  const Icon = icon.iconComp;
  return (
    <div className="flex flex-col gap-4 p-8 rounded-xl bg-slate-1 shadow-md">
      <Icon size={56} color={icon.color} weight="duotone" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-slate-11">{desc}</p>
    </div>
  );
};
