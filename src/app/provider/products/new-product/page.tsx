"use client";
import React, { useContext, useState } from "react";
import {
  InformationCircleIcon,
  ClockIcon,
  CheckBadgeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { LogoEdit, InfoEdit } from "@/components/widgets/provider-myprofile";
import { ProviderSettingsContext } from "@/ctx/ProviderSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/common";
import { RawProduct } from "@/types/product";
import { createProduct } from "@/server/products";
import { v4 as uuidv4 } from "uuid";
import { GalleryEdit } from "@/components/widgets/common/GalleryEdit";
import { updateProductImage } from "@/server/products";
import { SanityImage } from "@/types/provider";

const ProviderMyProfile = () => {
  const [isUpdatingGallery, setIsUpdatingGallery] = useState<boolean>(false);
  const [currentGallery, setCurrentGallery] = useState<SanityImage[]>([]); // [{src: string, alt: string}
  const [gallery, setGallery] = useState<string[]>([]);
  const { provider } = useContext(ProviderSettingsContext);
  const [productName, setProductName] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [pricing, setPricing] = useState<
    { _key: string; min: number; price: number }[]
  >([
    {
      _key: uuidv4(),
      min: 0,
      price: 0,
    },
  ]);
  const [categories, setCategories] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({}); // {key: value}
  const [leadTime, setLeadTime] = useState<{ [key: string]: string }>({}); // {key: value}
  const [sample, setSample] = useState<{
    maxSample: number;
    samplePrice: number;
  }>({
    maxSample: 0,
    samplePrice: 0,
  }); // {key: value}

  const getCurrentMinOrder = () => {
    return pricing[pricing.length - 1].min;
  };
  const getCurrentPrice = () => {
    return pricing[pricing.length - 1].price;
  };

  const onSubmit = async () => {
    const generateSlug = (name: string) => {
      //generate slug by removing spaces and lowercasing, adding - between words, and removing special characters, and adding random string at the end
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-") // Remove special characters
        .concat(new Date().getTime().toString())
        .slice(0, 200);
      return slug;
    };

    const getMinOrder = () => {
      if (pricing.length === 0) return 0;
      return pricing[0].min;
    };
    const rawAttr = Object.keys(attributes).map((key) => {
      return {
        _key: uuidv4(),
        key: key,
        value: attributes[key],
      };
    });

    const rawLeadTime = Object.keys(leadTime).map((key) => {
      return {
        _key: uuidv4(),
        count: key,
        time: leadTime[key],
      };
    });

    const data: RawProduct = {
      slug: generateSlug(productName),
      name: productName,
      unit: unit,
      provider: { _type: "reference", _ref: provider.id },
      pricing: pricing,
      minOrder: getCurrentMinOrder(),
      country: country,
      categories: categories,
      gallery: [],
      attributes: rawAttr,
      leadTimes: rawLeadTime,
      maxSample: sample.maxSample,
      samplePrice: sample.samplePrice,
    };

    try {
      const res = await createProduct(data);
      if (res) {
        setIsUpdatingGallery(true);
        gallery.map(async (image) => {
          const uploadRes = await updateProductImage(res._id, image, res.name);
          if (uploadRes)
            setCurrentGallery((prev) => [...prev, ...uploadRes.gallery]);
          return uploadRes;
        });
        // await Promise.all(promises);
        setIsUpdatingGallery(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGalleryUpdate = async (src: string[]) => {
    setGallery((prev) => [...prev, ...src]);
  };

  return (
    <div className="block mx-auto max-w-4xl w-full py-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {productName === "" ? "Untitled Product" : productName}
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-8">
            {/**
             *
             * PRODUCT INFORMATION
             *
             */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-full h-[1px] bg-slate-200" />
              <h1 className="text-slate-11 text-lg font-medium px-2 shrink-0">
                Product Information
              </h1>
              <div className="w-full h-[1px] bg-slate-200" />
            </div>
            {/**
             *
             * Product Name
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Name your product, better name better search results"
              />
            </div>
            {/**
             *
             * Unit
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="unit">Unit</Label>
              <Input
                type="text"
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Unit of measurement"
              />
            </div>
            {/**
             *
             * Country
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country of origin"
              />
            </div>
            {/**
             *
             * Pricing
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="country">Pricing</Label>
              <p className="text-slate-500 text-sm">{`Set pricing scheme by setting min order item and price for that value`}</p>
              {pricing.map((item, index) => (
                <div className="flex flex-row gap-1.5 items-center" key={index}>
                  <Input
                    type="number"
                    id="minOrder"
                    value={item.min}
                    onChange={(e) => {
                      const newPricing = [...pricing];
                      newPricing[index].min = parseInt(e.target.value);
                      setPricing(newPricing);
                    }}
                    placeholder="Min Order"
                  />
                  <Input
                    type="number"
                    id="price"
                    value={item.price}
                    step={0.01}
                    onChange={(e) => {
                      const newPricing = [...pricing];
                      newPricing[index].price = parseFloat(e.target.value);
                      setPricing(newPricing);
                    }}
                    placeholder="Price"
                  />
                  <button
                    className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3 shrink-0"
                    onClick={() => {
                      const newPricing = [...pricing];
                      newPricing.splice(index, 1);
                      setPricing(newPricing);
                    }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() => {
                  const newPricing = [...pricing];
                  newPricing.push({
                    _key: uuidv4(),
                    min: getCurrentMinOrder() + 100,
                    price: getCurrentPrice() - 0.02,
                  });
                  setPricing(newPricing);
                }}
              >
                Add price
              </Button>
            </div>
            {/**
             *
             * Categories
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="categories">Categories</Label>
              <p className="text-slate-500 text-sm">{`Select categories that best describe your product, separated by comma`}</p>
              <Input
                type="text"
                id="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value.split(","))}
                placeholder="Categories"
              />
            </div>
            {/**
             *
             * Gallery
             *
             */}
            <GalleryEdit
              submitGallery={handleGalleryUpdate}
              isUpdatingGallery={isUpdatingGallery}
              gallery={currentGallery}
            />
            {/**
             *
             * Attributes
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="attributes">Attributes</Label>
              <p className="text-slate-500 text-sm">{`Add attributes that best describe your product, separated by comma`}</p>
              {Object.keys(attributes).map((key, index) => (
                <div className="flex flex-row gap-1.5 items-center" key={index}>
                  <Input
                    type="text"
                    id="attributeKey"
                    value={key}
                    onChange={(e) => {
                      const newAttributes = { ...attributes };
                      newAttributes[e.target.value] = newAttributes[key];
                      delete newAttributes[key];
                      setAttributes(newAttributes);
                    }}
                    placeholder="Attribute name"
                  />
                  <Input
                    type="text"
                    id="attributeValue"
                    value={attributes[key]}
                    onChange={(e) => {
                      const newAttributes = { ...attributes };
                      newAttributes[key] = e.target.value;
                      setAttributes(newAttributes);
                    }}
                    placeholder="Value"
                  />
                  <button
                    className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3 shrink-0"
                    onClick={() => {
                      const newAttributes = { ...attributes };
                      delete newAttributes[key];
                      setAttributes(newAttributes);
                    }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() => {
                  const newAttributes = { ...attributes };
                  newAttributes[""] = "";
                  setAttributes(newAttributes);
                }}
              >
                Add attribute
              </Button>
            </div>
            {/**
             *
             * ORDER POLICIES
             *
             */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-full h-[1px] bg-slate-200" />
              <h1 className="text-slate-11 text-lg font-medium px-2 shrink-0">
                Order Policies
              </h1>
              <div className="w-full h-[1px] bg-slate-200" />
            </div>
            {/**
             *
             * Lead Time
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="leadTime">Lead Time</Label>
              <p className="text-slate-500 text-sm">{`Set lead time for each pricing scheme`}</p>
              {Object.keys(leadTime).map((key, index) => (
                <div className="flex flex-row gap-1.5 items-center" key={index}>
                  <Input
                    type="text"
                    id="leadTimeKey"
                    value={key}
                    onChange={(e) => {
                      const newLeadTime = { ...leadTime };
                      newLeadTime[e.target.value] = newLeadTime[key];
                      delete newLeadTime[key];
                      setLeadTime(newLeadTime);
                    }}
                    placeholder="Min order"
                  />
                  <Input
                    type="text"
                    id="leadTimeValue"
                    value={leadTime[key]}
                    onChange={(e) => {
                      const newLeadTime = { ...leadTime };
                      newLeadTime[key] = e.target.value;
                      setLeadTime(newLeadTime);
                    }}
                    placeholder="Value"
                  />
                  <button
                    className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3 shrink-0"
                    onClick={() => {
                      const newLeadTime = { ...leadTime };
                      delete newLeadTime[key];
                      setLeadTime(newLeadTime);
                    }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() => {
                  const newLeadTime = { ...leadTime };
                  newLeadTime[""] = "";
                  setLeadTime(newLeadTime);
                }}
              >
                Add lead time
              </Button>
            </div>
            {/**
             *
             * Sample
             *
             */}
            <div className="grid w-full max-w-md items-center gap-1.5">
              <Label htmlFor="sample">Sample</Label>
              <p className="text-slate-500 text-sm">{`Minimum items to order for sample and price`}</p>
              <div className="flex flex-row gap-1.5 items-center">
                <Input
                  type="number"
                  id="maxSample"
                  value={sample.maxSample}
                  onChange={(e) => {
                    const newSample = { ...sample };
                    newSample.maxSample = parseInt(e.target.value);
                    setSample(newSample);
                  }}
                  placeholder="Max sample"
                />
                <Input
                  type="number"
                  id="samplePrice"
                  value={sample.samplePrice}
                  onChange={(e) => {
                    const newSample = { ...sample };
                    newSample.samplePrice = parseFloat(e.target.value);
                    setSample(newSample);
                  }}
                  placeholder="Price"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row justify-center w-full gap-2">
            <Button
              className="w-full max-w-md"
              variant="primary"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProviderMyProfile;
