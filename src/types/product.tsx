export type Product = {
  id: number;
  name: string;
  unit: string;
  provider: string;
  price: string;
  minOrder: number;
  country: string;
  category: string;
  images: { [key: string]: string };
  attributes: { [key: string]: string };
  leadTime: { [key: string]: number | string };
  sample: { [key: string]: number };
};
