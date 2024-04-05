import {
  AddressBook,
  ChatCircle,
  Envelope,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { Icon } from "@phosphor-icons/react/dist/lib/types";
import { Link } from "@/config/i18n-navigation";
import React from "react";
import { useTranslations } from "next-intl";

export const Contact = ({ id }: { id: string }) => {
  const t = useTranslations("contact");
  return (
    <section
      className={`relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center`}
      id={id}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl w-full">
        <h1 className="text-4xl font-bold -mt-4 text-center">{t("title")}</h1>

        <p className="text-lg text-slate-11 mb-6 max-w-3xl text-center">
          {t("description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8">
          <ContactItem
            icon={Phone}
            title={t("phone")}
            desc="672-833-8277"
            href="tel:672-833-8277"
          />
          <ContactItem
            icon={Envelope}
            title={t("email")}
            desc="info@ezhouze.ca"
            href="mailto:info@ezhouze.ca"
          />
          <ContactItem
            icon={AddressBook}
            title={t("address")}
            desc="744 W Hastings St #420, Vancouver, BC V6C 1A5"
            href="https://maps.app.goo.gl/UryY2sx1tDHrzhGs6"
          />
          <ContactItem
            icon={ChatCircle}
            title={t("chat")}
            desc={t("chat-hint")}
            href="https://www.messenger.com/t/100830616339564"
          />
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: Icon;
  title: string;
  desc: string;
  href: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  icon: Icon,
  title,
  desc,
  href,
}) => {
  return (
    <Link
      className="flex justify-start items-start"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon size={28} color="#08346d" />
      <div className="flex flex-col gap-2 ml-2">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-slate-11">{desc}</p>
      </div>
    </Link>
  );
};
