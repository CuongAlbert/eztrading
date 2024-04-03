export type Product = {
  id: number;
  slug: string;
  name: string;
  unit: string;
  provider: string;
  price: string;
  rawPrice: { [key: number]: number };
  minOrder: number;
  country: string;
  category: string;
  images: { [key: string]: string };
  attributes: { [key: string]: string };
  leadTime: { [key: string]: number | string };
  sample: { [key: string]: number };
};

export type RawProduct = {
  slug: string;
  name: string;
  unit: string;
  provider: { _type: string; _ref: string };
  pricing: { _key: string; min: number; price: number }[];
  minOrder: number;
  country: string;
  categories: string[];
  gallery: any[];
  attributes: { key: string; value: string }[];
  leadTimes: { count: string; time: string }[];
  maxSample: number;
  samplePrice: number;
};
