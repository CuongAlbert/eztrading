import React from "react";
import Image from "next/image";

interface Props {
  tagline: string;
  title: string;
  desc: string;
  isSolid?: boolean;
  action: {
    text: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
  id?: string;
}

export const ServiceDetailsCompact: React.FC<Props> = ({
  tagline,
  title,
  desc,
  isSolid = false,
  action,
  image,
  id,
}) => {
  return (
    <section
      id={id}
      className={`relative w-full mx-auto px-4 sm:px-6 py-24 flex justify-center items-center ${
        isSolid ? "bg-blue-2" : ""
      }`}
    >
      <div className="flex flex-col justify-center items-center gap-4 max-w-7xl w-full">
        <p className="uppercase text-blue-12 font-bold">{tagline}</p>
        <h1 className="text-3xl font-bold -mt-4 text-center">{title}</h1>

        <p className="text-lg text-slate-11 mb-6 max-w-3xl text-center">
          {desc}
        </p>
        <a href={action.href} className="btn btn-primary max-w-fit">
          {action.text}
        </a>
        <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-xl mt-8">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 432px"
          />
        </div>
      </div>
    </section>
  );
};
