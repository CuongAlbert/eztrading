import Image from "next/image";
import React from "react";

export const ServiceDetailsLong = () => {
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl">
        <p className="uppercase text-blue-12 font-bold">Our services</p>
        <h1 className="text-5xl font-bold -mt-4 text-center">EZPROTECT</h1>

        <p className="text-xl text-slate-11 mb-6 text-center">
          We offer a range of services to help you protect your home and
          investment.
        </p>
        <ServiceDetailsLongItem
          image={{
            src: "/home-images/home-inspector.avif",
            alt: "Health Home, Healthy Investment",
          }}
          title="Home Inspection"
          description="A comprehensive and reliable home inspection service that goes the extra mile to ensure your peace of mind? Look no further than EZHOUZE Home Inspection Service, your trusted partner in safeguarding your most valuable property - your home."
          action={{
            text: "Explore home inspectors",
            href: "/home-inspection",
          }}
          id="home-inspection"
        />
        <ServiceDetailsLongItem
          image={{
            src: "/home-images/house-insurance.avif",
            alt: "Health Home, Healthy Investment",
          }}
          title="Home Insurance"
          description="EZHOUZE Home Insurance Services is your innovative, collaborative, and customer-centric online broker for home insurance. We bring together top insurance companies to offer you a range of options that prioritize your home's safety and your peace of mind."
          action={{
            text: "Get a quote",
            href: "#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave",
          }}
          reverse
          id="home-insurance"
        />
        <ServiceDetailsLongItem
          image={{
            src: "/home-images/rental-protection.avif",
            alt: "Health Home, Healthy Investment",
          }}
          title="Rental Unit Protection"
          description="EZHOUZE Rental Unit Protection Service is your trusted partner in maintaining the value and integrity of your Rental property. We offer a comprehensive and innovative solution that ensures your Rental unit remains in top shape while delivering a customer-centric experience to both property owners and tenants."
          action={{
            text: "Get a quote",
            href: "#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave",
          }}
          id="rental-unit-protection"
        />
      </div>
    </section>
  );
};

const ServiceDetailsLongItem = ({
  image,
  title,
  description,
  action,
  reverse = false,
  id,
}: {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  action: {
    text: string;
    href: string;
  };
  reverse?: boolean;
  id?: string;
}) => {
  return (
    <div
      id={id}
      className={`flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16 py-8 md:py-4 md:px-16 md:justify-center items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 aspect-square relative rounded-lg overflow-hidden shadow-xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 432px"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-slate-11">{description}</p>
        <a href={action.href} className="btn btn-primary max-w-fit">
          {action.text}
        </a>
      </div>
    </div>
  );
};
