"use server";

import { NewProvider, ProviderInfo } from "@/types/provider";

import { b64toBlob } from "@/lib/helpers";
import { client } from "./SanityClient";
import { v4 as uuidv4 } from "uuid";

export const createProvider = async (provider: NewProvider) => {
  const newData = {
    _type: "providers",
    ...provider,
  };

  try {
    // console.log("create new provider", newData);
    const data = await client.create(newData);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProviderByAuthProviderId = async (
  authProviderId: string,
): Promise<ProviderInfo> => {
  const query = `
        *[_type == "providers" && authProviderId == "${authProviderId}"] 
        `;
  const res = await client.fetch(
    query,
    {},
    {
      cache: "no-cache",
    },
  );
  const data: ProviderInfo = {
    id: res[0]._id,
    company: res[0].company,
    description: res[0].description,
    email: res[0].email,
    logo: res[0].logo,
    paymentTerms: res[0].paymentTerms,
    phone: res[0].phone,
    shipping: res[0].shipping,
    slug: res[0].slug?.current || "",
    username: res[0].username || "",
    verified: res[0].verified || false,
    authProviderId: res[0].authProviderId,
    address: res[0].address || "",
  };
  return data;
};

interface AllowedUpdate {
  description: string;
  paymentTerms: string;
  shipping: string;
  address: string;
}

export const updateProviderInfo = async (
  providerId: string,
  field: Partial<AllowedUpdate>,
) => {
  if (field === null) return null;
  try {
    const res = await client.patch(providerId).set(field).commit();

    return res;
  } catch (error) {
    return null;
  }
};

export const updateProviderLogo = async (
  providerId: string,
  logo: string,
  name: string,
) => {
  const image = b64toBlob(logo);

  try {
    const asset = await client.assets.upload("image", image, {
      contentType: image.type,
      filename: name,
    });
    const res = await client
      .patch(providerId)
      .set({
        logo: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      })
      .commit();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProviderName = async (providerId: string) => {
  const query = `
    *[_type == "providers" && _id == "${providerId}"] {
      company
    }
  `;
  const res = await client.fetch(query);
  return res[0].company;
};

// const updateProviderLogo = async () => {
//   if (!selectedImage) return;
//   toBase64(selectedImage).then((res) => console.log(res));
//   try {
//     const asset = await client.assets.upload("image", selectedImage, {
//       contentType: selectedImage.type,
//       filename: selectedImage.name,
//     });

//     const res = await client
//       .patch(providerId)
//       .set({
//         logo: {
//           _type: "image",
//           asset: {
//             _type: "reference",
//             _ref: asset._id,
//           },
//         },
//       })
//       .commit();

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getProvidersById = async (providerId: string) => {
  const query = `
    *[_type == "providers" && _id == "${providerId}"] `;
  const res = await client.fetch(query);
  const data: ProviderInfo = {
    id: res[0]._id,
    company: res[0].company,
    description: res[0].description,
    email: res[0].email,
    logo: res[0].logo,
    paymentTerms: res[0].paymentTerms,
    phone: res[0].phone,
    shipping: res[0].shipping,
    slug: res[0].slug?.current || "",
    username: res[0].username || "",
    verified: res[0].verified || false,
    authProviderId: res[0].authProviderId,
    address: res[0].address || "",
  };
  return data;
};
