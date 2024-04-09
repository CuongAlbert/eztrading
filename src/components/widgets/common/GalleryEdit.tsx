"use client";
import React, { useEffect } from "react";
import { client, urlFor } from "@/server/SanityClient";
import { SanityImage } from "@/types/provider";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { PhotoProvider, PhotoView } from "react-photo-view";
import { v4 as uuidv4 } from "uuid";
import { toBase64 } from "@/lib/helpers";
import { useTranslations } from "next-intl";

interface GalleryEditProps {
  isUpdatingGallery: boolean;
  gallery: SanityImage[];
  submitGallery: (src: string[]) => void;
}

export const GalleryEdit: React.FC<GalleryEditProps> = ({
  isUpdatingGallery,
  gallery,
  submitGallery,
}) => {
  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  // const [currentGallery, setCurrentGallery] =
  //   React.useState<SanityImage[]>(gallery);
  const currentGallery = gallery;
  const t = useTranslations("provider");
  useEffect(() => {
    if (!selectedImages) {
      setPreviewUrls([]);
      return;
    }
    // const objUrl = URL.createObjectURL(selectedImage);
    const objUrls = selectedImages.map((image) => URL.createObjectURL(image));

    setPreviewUrls(objUrls);

    return () => {
      //   URL.revokeObjectURL(objUrls);
      objUrls.forEach((objUrl) => URL.revokeObjectURL(objUrl));
    };
  }, [selectedImages]);

  const onSelectImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImages([]);
      return;
    }

    const newImages = Array.from(e.target.files);
    const src = newImages.map(async (image) => await toBase64(image));
    const base64Images = await Promise.all(src);

    submitGallery(base64Images);
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const onSaveGallery = async () => {
    if (!selectedImages || selectedImages.length === 0) return;

    const src = selectedImages.map(async (image) => await toBase64(image));
    const base64Images = await Promise.all(src);

    submitGallery(base64Images);
  };

  const isEmpty =
    (!currentGallery || currentGallery.length === 0) &&
    (!previewUrls || previewUrls.length === 0);

  return (
    <div className="flex flex-col gap-4">
      <PhotoProvider speed={() => 150}>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[300px] max-h-[500px] overflow-auto border border-slate-5 p-4 rounded-lg relative">
          {isEmpty && (
            <label
              className="w-full h-full flex flex-col justify-center items-center rounded-lg bg-slate-5 cursor-pointer absolute top-0 left-0"
              htmlFor="multiple-files"
            >
              <PhotoIcon className="w-12 h-12 text-slate-8" />
              <p className="text-slate-8">{t("gallery.add-photo")}</p>
            </label>
          )}
          <label
            className="w-full aspect-square flex flex-col justify-center items-center rounded-md bg-slate-5 cursor-pointer "
            htmlFor="multiple-files"
          >
            <PhotoIcon className="w-12 h-12 text-slate-8" />
            <p className="text-slate-8">{t("gallery.add-photo")}</p>
          </label>
          {previewUrls &&
            previewUrls.length > 0 &&
            previewUrls.map((url, index) => (
              <div className="w-full aspect-square relative" key={index}>
                <PhotoView key={index} src={url}>
                  <Image
                    key={index}
                    fill
                    className="object-cover rounded-md opacity-60"
                    src={url}
                    alt="EZHOUZE"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </PhotoView>
                <div className="absolute top-2 right-2 bg-slate-100 rounded-md p-1 ">
                  <p className="text-amber-700 text-xs">
                    {isUpdatingGallery ? "Saving..." : "Unsaved"}
                  </p>
                </div>
                {isUpdatingGallery && (
                  <span className="loading loading-infinity text-blue-12 loading-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            ))}
          {currentGallery &&
            currentGallery.length > 0 &&
            currentGallery.map((g: any) => (
              <div className="w-full aspect-square relative" key={g._key}>
                <PhotoView key={g._key} src={urlFor(g).width(1024).url()}>
                  <Image
                    key={g._key}
                    fill
                    className="object-cover rounded-md"
                    src={urlFor(g).width(384).url()}
                    alt={g.alt || "EZHOUZE"}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </PhotoView>
              </div>
            ))}
        </div>
      </PhotoProvider>
      <div className="flex gap-4 flex-1">
        <label
          htmlFor="multiple-files"
          className="btn btn-secondary w-full flex-1"
        >
          <PhotoIcon className="w-6 h-6" />
          <p>{t("gallery.add-photo")}</p>
        </label>
        <input
          type="file"
          className="hidden"
          id="multiple-files"
          accept="image/*"
          onChange={onSelectImageHandler}
          multiple
        />
      </div>
    </div>
  );
};
