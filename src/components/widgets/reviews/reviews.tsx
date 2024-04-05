"use client";

import "@smastrom/react-rating/style.css";

import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import React, { use, useEffect, useRef, useState, useTransition } from "react";

import { Rating } from "@smastrom/react-rating";
import { Review } from "@/types/reviews";
import { addReviewToProduct } from "@/server/reviews";
import { calculateAverageRating } from "@/lib/helpers";
import pick from "lodash/pick";

type Props = {
  productId: string;
  initReviews: Review[];
};

const Reviews: React.FC<Props> = ({ productId, initReviews }) => {
  const [reviews, setReviews] = useState<Review[]>(initReviews);
  const [error, setError] = useState<{
    name: string;
    email: string;
    rating: string;
    review: string;
  }>({ name: "", email: "", rating: "", review: "" });
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  useEffect(() => {
    const { avgRating, totalReviews } = calculateAverageRating(reviews);
    setAverageRating(avgRating);
    setTotalReviews(totalReviews);
  }, [reviews]);

  const [submitError, setSubmitError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState<number>(0);
  const t = useTranslations("product-detail.reviews");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const review = formData.get("review") as string;

    const resetField = () => {
      if (formRef.current) {
        formRef.current.reset();
      }
    };

    const validation = {
      name: "",
      email: "",
      rating: "",
      review: "",
    };

    if (!name) {
      validation.name = t("validation-name");
    }
    if (!review) {
      validation.review = t("validation-review");
    }
    if (!rating || rating === 0) {
      validation.rating = t("validation-rating");
    }

    if (validation.name || validation.review || validation.rating) {
      setError(validation);
      setSubmitting(false);
      return;
    }

    const newReview = {
      _id: "",
      name,
      email,
      rating,
      review,
      _createdAt: new Date().toISOString(),
    };

    addReviewToProduct(productId, name, email, rating, review).then((res) => {
      if (res) {
        setReviews([newReview, ...reviews]);
        setError({ name: "", email: "", rating: "", review: "" });
        setSubmitting(false);
        resetField();
      } else {
        setSubmitError(t("submit-error"));
        return;
      }
    });
  };

  return (
    <section className="w-full flex flex-col gap-8" id="reviews">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">{t("title")}</p>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-2 justify-center items-center  rounded-md border p-4">
            <p className="text-5xl font-medium">
              {averageRating ? averageRating.toFixed(1) : "--"}
            </p>
            <p className="text-sm italic text-slate-500 lowercase">
              {t("avg-rating")}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center  rounded-md border p-4">
            <p className="text-5xl font-medium">{totalReviews}</p>
            <p className="text-sm italic text-slate-500 lowercase">
              {t("total-reviews")}
            </p>
          </div>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col gap-2 border-b border-slate-3 last:border-none pb-4"
            >
              <div className="flex gap-2 items-center">
                <h3 className="font-bold ">{review.name}</h3>

                <p className="text-sm text-slate-9">
                  {new Date(review._createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Rating
                value={review.rating}
                style={{ maxWidth: 100 }}
                readOnly
              />
              <p>{review.review}</p>
              <div className="border-b border-slate-3 last-of-type:hidden" />
            </div>
          ))}
        </div>
      ) : (
        <p>{t("no-review")}</p>
      )}
      {/* <div className="border-b border-slate-5" /> */}
      <h2 className="text-xl font-bold">{t("write-review")}</h2>
      <div className="w-full">
        <form
          className="w-full flex flex-col gap-4 max-w-xl"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2 items-center">
              <label htmlFor="name" className="font-semibold">
                {t("form-name")}
              </label>
              {error.name && error.name !== "" && (
                <p className="text-red-500 text-sm">{error.name}</p>
              )}
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-slate-5 rounded-md p-2 max-w-xl"
              disabled={submitting}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="email" className="font-semibold">
                {t("form-email")}
              </label>
              {error.email && error.email !== "" && (
                <p className="text-red-500 text-sm">{error.email}</p>
              )}
            </div>

            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-slate-5 rounded-md p-2"
              disabled={submitting}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="eeeeeee" className="font-semibold">
                {t("form-rating")}
              </label>
              {error.rating && error.rating !== "" && (
                <p className="text-red-500 text-sm">{error.rating}</p>
              )}
            </div>
            <Rating
              value={rating}
              onChange={setRating}
              isRequired
              style={{ maxWidth: 150 }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <label htmlFor="eeeeeee" className="font-semibold">
                {t("form-review")}
              </label>
              {error.review && error.review !== "" && (
                <p className="text-red-500 text-sm">{error.review}</p>
              )}
            </div>
            <textarea
              id="review"
              name="review"
              className="w-full border border-slate-5 rounded-md p-2"
              disabled={submitting}
            />
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="btn btn-primary max-w-fit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? t("form-submitting") : t("form-submit")}
            </button>
            {submitError && submitError !== "" && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reviews;
