"use client";
// import { urlFor } from "@/config/sanityConfig";
import { ProviderInfo } from "@/types/provider";
import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface PhotoGalleryProps {
  provider: ProviderInfo;
}

// export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ provider }) => {
//   return (
//     <PhotoProvider speed={() => 150}>
//       <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-auto border border-slate-5 p-4 rounded-lg">
//         {provider.gallery &&
//           provider.gallery.map((g: any) => (
//             <div className="w-full aspect-square relative" key={g._key}>
//               <PhotoView key={g._key} src={urlFor(g).width(1024).url()}>
//                 <Image
//                   key={g._key}
//                   fill
//                   className="object-cover rounded-md"
//                   src={urlFor(g).width(384).url()}
//                   alt={provider.company || "EZHOUZE"}
//                 />
//               </PhotoView>
//             </div>
//           ))}
//       </div>
//     </PhotoProvider>
//   );
// };

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ provider }) => {
  return null;
};
