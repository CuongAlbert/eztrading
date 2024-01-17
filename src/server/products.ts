"use server";
import { client, urlFor } from "./SanityClient";
import { Product, RawProduct } from "@/types/product";
import { getMinMaxPrice } from "@/lib/helpers";
import { b64toBlob } from "@/lib/helpers";
import { v4 as uuidv4 } from "uuid";
export const searchProducts = async (query: string): Promise<Product[]> => {
  //separate query into words
  const tokens = query.split(/\s+/);
  const titleMatchingClauses = tokens.map((token) => `name match "${token}"`);
  const titleMatchingQuery = titleMatchingClauses.join(" || ");
  const groq = `*[_type == "products" && (${titleMatchingQuery})] {
        _id, 
        name, 
        unit, 
        providers,
        pricing,
        country,
        categories,
        gallery,
        attributes,
        leadTimes, 
        maxSample,
        samplePrice,
        slug,
        minOrder

    }`;

  const products = await client.fetch(
    groq,
    {},
    {
      cache: "no-cache",
    },
  );

  if (!products) {
    throw new Error(`Products not found`);
  }
  console.log(products);

  const result: Product[] = products.map((product: any) => {
    console.log(product);
    //check if product.gallery is array

    if (!Array.isArray(product.gallery)) {
      product.gallery = [];
    }
    const { minPrice, maxPrice } = getMinMaxPrice(product.pricing);
    //generate price range string based on min and max price
    const priceRange =
      minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

    //convert categories array to string for display
    const categories = product.categories
      .map((category: any) => category)
      .join(", ");

    //convert attributes to   attributes: { [key: string]: string };

    const attributes = product.attributes.reduce((obj: any, item: any) => {
      if (item.key && item.value) {
        obj[item.key] = item.value;
      }
      return obj;
    }, {});

    const leadTime = product.leadTimes.reduce((obj: any, item: any) => {
      if (item.count && item.time) {
        obj[item.count] = item.time;
      }
      return obj;
    }, {});

    // const images = product.gallery.map((image: any) => {
    //   image._key, urlFor(image).url();
    // });

    const images = product.gallery.reduce((obj: any, item: any) => {
      if (item._key && item.asset) {
        obj[item._key] = urlFor(item).url();
      }
      return obj;
    }, {});

    return {
      id: product._id,
      slug: product.slug.current,
      name: product.name,
      unit: product.unit,
      provider: product.providers._ref,
      price: priceRange,
      country: product.country,
      category: categories,
      images: images,
      attributes: attributes,
      leadTime: leadTime,
      minOrder: product.minOrder,
      sample: {
        maxSample: product.maxSample,
        samplePrice: product.samplePrice,
      },
    };
  });

  return result;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const groq = `*[_type == "products" && slug.current == $slug] {
        _id, 
        name, 
        unit, 
        providers,
        pricing,
        country,
        categories,
        gallery,
        attributes,
        leadTimes, 
        maxSample,
        samplePrice,
        slug,
        minOrder

        }[0]`;
  const product = await client.fetch(groq, { slug });

  if (!product) {
    throw new Error(`Product not found`);
  }

  const { minPrice, maxPrice } = getMinMaxPrice(product.pricing);
  //generate price range string based on min and max price
  const priceRange =
    minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  //convert categories array to string for display
  const categories = product.categories
    .map((category: any) => category)
    .join(", ");

  //convert attributes to   attributes: { [key: string]: string };

  const attributes = product.attributes.reduce((obj: any, item: any) => {
    if (item.key && item.value) {
      obj[item.key] = item.value;
    }
    return obj;
  }, {});

  const leadTime = product.leadTimes.reduce((obj: any, item: any) => {
    if (item.count && item.time) {
      obj[item.count] = item.time;
    }
    return obj;
  }, {});

  // const images = product.gallery.map((image: any) => {
  //   image._key, urlFor(image).url();
  // });

  const images = product.gallery.reduce((obj: any, item: any) => {
    if (item._key && item.asset) {
      obj[item._key] = urlFor(item).url();
    }
    return obj;
  }, {});

  const result: Product = {
    id: product._id,
    slug: product.slug.current,
    name: product.name,
    unit: product.unit,
    provider: product.providers._ref,
    price: priceRange,
    country: product.country,
    category: categories,
    images: images,
    attributes: attributes,
    leadTime: leadTime,
    minOrder: product.minOrder,
    sample: {
      maxSample: product.maxSample,
      samplePrice: product.samplePrice,
    },
  };

  return result;
};

export const createProduct = async (product: RawProduct) => {
  const newData = {
    _type: "products",
    name: product.name,
    unit: product.unit,
    providers: {
      _weak: true,
      ...product.provider,
    },

    pricing: product.pricing,
    country: product.country,
    categories: product.categories,
    gallery: product.gallery,
    attributes: product.attributes,
    leadTimes: product.leadTimes,
    maxSample: product.maxSample,
    samplePrice: product.samplePrice,
    minOrder: product.minOrder,
    slug: {
      _type: "slug",
      current: product.slug,
    },
  };
  console.log(newData);
  try {
    const res = await client.create(newData);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductImage = async (
  productId: string,
  image: string,
  name: string,
) => {
  const imageBlob = b64toBlob(image);

  try {
    const asset = await client.assets.upload("image", imageBlob, {
      contentType: imageBlob.type,
      filename: name,
    });
    const res = await client
      .patch(productId)
      .setIfMissing({ gallery: [] })
      .append("gallery", [
        {
          _key: uuidv4(),
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      ])
      .commit();
    console.log("upload photo", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
