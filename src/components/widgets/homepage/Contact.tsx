import React from "react";
import Link from "next/link";
import {
  Envelope,
  Phone,
  AddressBook,
  ChatCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@phosphor-icons/react/dist/lib/types";

export const Contact = ({ id }: { id: string }) => {
  return (
    <section
      className={`relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center`}
      id={id}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl w-full">
        <h1 className="text-4xl font-bold -mt-4 text-center">
          Let us know how we can help
        </h1>

        <p className="text-lg text-slate-11 mb-6 max-w-3xl text-center">
          We’re here to help and answer any question you might have.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8">
          <ContactItem
            icon={Phone}
            title="Phone"
            desc="672-833-8277"
            href="tel:672-833-8277"
          />
          <ContactItem
            icon={Envelope}
            title="Email"
            desc="info@ezhouze.ca"
            href="mailto:info@ezhouze.ca"
          />
          <ContactItem
            icon={AddressBook}
            title="Address"
            desc="744 W Hastings St #420, Vancouver, BC V6C 1A5"
            href="https://maps.app.goo.gl/UryY2sx1tDHrzhGs6"
          />
          <ContactItem
            icon={ChatCircle}
            title="Chat with support"
            desc="Start chatting"
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
