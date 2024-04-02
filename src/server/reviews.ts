"use server";

import { Review } from "@/types/reviews";
import { client } from "./SanityClient";

export const getReviewsByProductId = async (productId: string) => {
  const query = `
        *[_type == "reviews" && product._ref == "${productId}"] | order(_createdAt desc)
        `;
  const res = await client.fetch(
    query,
    {},
    {
      cache: "no-cache",
    },
  );
  const result: Review[] = res.map((review: any) => {
    return {
      _id: review._id,
      name: review.name,
      email: review.email,
      review: review.review,
      rating: review.rating,
      _createdAt: review._createdAt,
    };
  });
  return result;
};

export const addReviewToProduct = async (
  productId: string,
  name: string,
  email: string,
  rating: number,
  review: string,
) => {
  const newReview = {
    _type: "reviews",
    product: {
      _type: "reference",
      _ref: productId,
    },
    name,
    email,
    rating,
    review,
  };

  try {
    const res = await client.create(newReview).then((res) => {
      return res;
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAverageRating = async (productId: string) => {
  const query = `
        *[_type == "reviews" && product._ref == "${productId}"] {
        rating
        }
    `;
  const res = await client.fetch(query);
  const total = res.reduce((acc: any, curr: any) => acc + curr.rating, 0);
  const average = total / res.length;
  //rounded to 1 decimal place

  return {
    average: average.toFixed(1),
    total: res.length,
  };
};
