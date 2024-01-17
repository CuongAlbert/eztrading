"use server";
import { client } from "./SanityClient";

export const searchProducts = async (query: string) => {
  //separate query into words
  const tokens = query.split(/\s+/);
  const titleMatchingClauses = tokens.map((token) => `name match "${token}"`);
  const titleMatchingQuery = titleMatchingClauses.join(" || ");
  const groq = `*[_type == "products" && (${titleMatchingQuery})] {
        name
    }`;

  const products = await client.fetch(groq);

  return products;
};

export const getProductBySlug = async (slug: string) => {
  const groq = `*[_type == "products" && slug.current == $slug] {
            name,
            slug,
            description,
            pricing,
        }[0]`;
  const product = await client.fetch(groq, { slug });
  return product;
};
