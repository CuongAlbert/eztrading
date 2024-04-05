import { Toolbox, CurrencyCircleDollar } from "@phosphor-icons/react/dist/ssr";
import {
  Squares2X2Icon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Icon } from "@phosphor-icons/react/dist/lib/types";
import React from "react";

const SERVICES_ICON = [
  {
    iconComp: Squares2X2Icon,
    color: "#072c09",
  },

  {
    iconComp: ShieldCheckIcon,
    color: "#34238b",
  },

  {
    iconComp: BuildingStorefrontIcon,
    color: "#e6b633",
  },
  {
    iconComp: IdentificationIcon,
    color: "#e6b633",
  },
];

export const ServicesSummary = (props: {
  lang: { title: string; desc: string }[];
}) => {
  const lang = props.lang;
  const services = lang.map((l, idx) => {
    return {
      title: l.title,
      desc: l.desc,
      icon: SERVICES_ICON[idx],
    };
  });
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service) => (
        <ServicesItem
          key={service.title}
          title={service.title}
          desc={service.desc}
          icon={service.icon}
        />
      ))}
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
    <div className="flex flex-col gap-4 p-4 lg:p-8 rounded-xl bg-slate-50/30 backdrop-blur-md border-border border">
      <div className="p-4 rounded-full bg-slate-50 max-w-fit">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-slate-11">{desc}</p>
    </div>
  );
};
