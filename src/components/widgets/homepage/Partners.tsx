import React from "react";
import Image from "next/image";

const PartnersData = [
  { src: "/images/partners/Ikea.png", alt: "Ikea" },
  {
    src: "/images/partners/Home Hardware.png",
    alt: "Home Hardware",
  },
  {
    src: "/images/partners/A-Z Home Inspections.png",
    alt: "A-Z Home Inspections",
  },
  { src: "/images/partners/EXP Realty logo.png", alt: "EXP Realty" },
  {
    src: "/images/partners/Home Depot Canada.png",
    alt: "Home Depot Canada",
  },
  { src: "/images/partners/Inspect 360.png", alt: "Inspect 360" },
  { src: "/images/partners/Northwoods.jpg", alt: "Northwoods" },
  { src: "/images/partners/square.svg", alt: "Square" },
  { src: "/images/partners/TD insurance.png", alt: "TD Insurance" },
  {
    src: "/images/partners/stonehaus_realty logo.png",
    alt: "Stonehaus Realty",
  },
];
export const Partners = ({ id }: { id: string }) => {
  return (
    <section
      className={`relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center bg-blue-2`}
      id={id}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl w-full">
        <h1 className="text-4xl font-bold -mt-4 text-center">
          Partnerships & Collaborations
        </h1>

        <p className="text-lg text-slate-11 mb-6 max-w-3xl text-center">
          At EZHOUZE, we believe in the power of collaboration to drive
          innovation and create exceptional experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
          {PartnersData.map((partner) => (
            <div
              className="aspect-video h-16 relative rounded-lg overflow-hidden mt-8"
              key={partner.src}
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 432px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
