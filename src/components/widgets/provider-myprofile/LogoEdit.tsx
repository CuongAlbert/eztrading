"use client";
import React, { useEffect } from "react";
import { client, urlFor } from "@/server/SanityClient";
import { SanityImage } from "@/types/provider";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { toBase64, b64toBlob } from "@/lib/helpers";
import { updateProviderLogo } from "@/server/providers";

interface LogoEditProps {
  logo: SanityImage | null;
  providerId: string;
}

export const LogoEdit: React.FC<LogoEditProps> = ({ logo, providerId }) => {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = React.useState<SanityImage | null>(
    logo,
  );
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }
    const objUrl = URL.createObjectURL(selectedImage);

    setPreviewUrl(objUrl);

    return () => {
      URL.revokeObjectURL(objUrl);
    };
  }, [selectedImage]);

  const onSelectImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(null);
      return;
    }
    setSelectedImage(e.target.files[0]);
  };

  const onSaveLogo = async () => {
    if (!selectedImage) return;
    setIsUpdating(true);
    const b64Image = await toBase64(selectedImage);
    const data = await updateProviderLogo(
      providerId,
      b64Image,
      selectedImage.name,
    );

    setIsUpdating(false);
    if (!data) return;
    setCurrentLogo(data.logo);
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col gap-4 max-w-min">
      <div className="w-48 h-48 rounded-lg relative">
        {previewUrl ? (
          <div className="w-full h-full">
            <label htmlFor="actual-button" className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                id="actual-button"
                accept="image/*"
                onChange={onSelectImageHandler}
              />
              <figure className="w-full h-full relative shrink-0 bg-slate-2">
                <Image
                  fill
                  src={previewUrl}
                  alt="logo"
                  className="object-cover rounded-md"
                  sizes="(max-width: 0px) 100px, (max-width: 0px) 100px, 100px"
                />
              </figure>
            </label>
            <div
              className="absolute top-2 right-2 bg-slate-12/50 rounded-full p-1 cursor-pointer hover:bg-slate-12/100 transition-opacity ease-in-out"
              onClick={() => setPreviewUrl(null)}
            >
              <XMarkIcon className="w-6 h-6 text-slate-1" />
            </div>
          </div>
        ) : currentLogo ? (
          <label htmlFor="actual-button" className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="actual-button"
              accept="image/*"
              onChange={onSelectImageHandler}
            />
            <figure className="w-full h-full relative shrink-0 bg-slate-2">
              <Image
                fill
                src={urlFor(currentLogo).width(320).height(320).url()}
                alt="logo"
                className="object-contain md:object-cover rounded-md"
                sizes="(max-width: 0px) 100px, (max-width: 0px) 100px, 100px"
              />
            </figure>
          </label>
        ) : (
          <label
            className="w-full h-full flex flex-col justify-center items-center rounded-lg bg-slate-5 cursor-pointer"
            htmlFor="actual-button"
          >
            <PhotoIcon className="w-12 h-12 text-slate-8" />
            <p className="text-slate-8">Add logo</p>
          </label>
        )}
      </div>
      {!previewUrl ? (
        <>
          <label className="btn btn-secondary" htmlFor="actual-button">
            Choose logo{" "}
          </label>
          <input
            type="file"
            className="hidden"
            id="actual-button"
            accept="image/*"
            onChange={onSelectImageHandler}
          />
        </>
      ) : !isUpdating ? (
        <button className="btn btn-primary" onClick={onSaveLogo}>
          Save
        </button>
      ) : (
        <button className="btn btn-secondary" onClick={onSaveLogo}>
          <span className="loading loading-spinner loading-sm bg-blue-4" />
        </button>
      )}
    </div>
  );
};
