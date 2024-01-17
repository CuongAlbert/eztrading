type Pricing = {
  min: number;
  price: number;
  _key: string;
};

function isValidPricing(input: any): input is Pricing {
  return (
    input &&
    typeof input.min === "number" &&
    typeof input.price === "number" &&
    typeof input._key === "string"
  );
}

export function getMinMaxPrice(pricings: Pricing[]): {
  minPrice: number;
  maxPrice: number;
} {
  //   if (!isValidPricing(pricings)) {
  //     return { minPrice: 0, maxPrice: 0 };
  //   }

  let minPrice = Number.MAX_VALUE;
  let maxPrice = Number.MIN_VALUE;

  pricings.forEach((pricing) => {
    if (pricing.price < minPrice) {
      minPrice = pricing.price;
    }
    if (pricing.price > maxPrice) {
      maxPrice = pricing.price;
    }
  });

  return { minPrice, maxPrice };
}
