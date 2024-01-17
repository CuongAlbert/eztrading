"use server";
import { client, urlFor } from "./SanityClient";
import { Product } from "@/types/product";
import { getMinMaxPrice } from "@/lib/helpers";

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

  const products = await client.fetch(groq);

  if (!products) {
    throw new Error(`Products not found`);
  }
  console.log(products);

  const result: Product[] = products.map((product: any) => {
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
