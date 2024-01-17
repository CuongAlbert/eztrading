export type SanityImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

export type ProviderInfo = {
  id: string;
  company: string;
  description: string;
  email: string;
  logo: SanityImage;
  paymentTerms: string;
  phone: string;
  shipping: string;
  slug: string;
  username: string;
  verified: boolean;
  authProviderId: string;
  address: string;
};

export type NewProvider = Partial<ProviderInfo>;
