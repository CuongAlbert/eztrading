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

export const toBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        return reject("Error converting file to base64");
      }
      return resolve(reader.result);
    };
    reader.onerror = reject;
  });

export const b64toBlob = (
  b64Data: string,
  contentType = "",
  sliceSize = 512,
) => {
  // extract content type and base64 payload from original string
  var pos = b64Data.indexOf(";base64,");
  var type = b64Data.substring(5, pos);
  var b64 = b64Data.substring(pos + 8);

  // decode base64
  var imageContent = atob(b64);

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  var buffer = new ArrayBuffer(imageContent.length);
  var view = new Uint8Array(buffer);

  // fill the view, using the decoded base64
  for (var n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }

  // convert ArrayBuffer to Blob
  var blob = new Blob([buffer], { type: type });

  return blob;
};
