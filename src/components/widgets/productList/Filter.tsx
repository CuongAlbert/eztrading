"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchResultContext } from "@/ctx/SearchResult";
import { SelectGroup } from "@radix-ui/react-select";

export default function Filter() {
  const { filterCriteria, filterProducts, categoriesList, countriesList } =
    React.useContext(SearchResultContext);

  const [minOrder, setMinOrder] = useState(filterCriteria.minOrder);
  const [category, setCategory] = useState(filterCriteria.category);
  const [country, setCountry] = useState(filterCriteria.country);
  const [minPrice, setMinPrice] = useState(filterCriteria.minPrice);
  const [maxPrice, setMaxPrice] = useState(filterCriteria.maxPrice);

  const filter = () => {
    filterProducts({
      minOrder,
      category,
      country,
      minPrice,
      maxPrice,
    });
  };

  const handleCategoryChange = (v: string) => {
    setCategory(v);
    filter();
  };
  const handleCountryChange = (v: string) => {
    setCountry(v);
    filter();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-slate-50/50 backdrop-blur-md border-border border rounded-xl">
      <div className="flex flex-col gap-2">
        <Label className="shrink-0">Category</Label>
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="bg-slate-50/30 backdrop-blur-md flex items-center justify-between">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categoriesList.map((cate) => (
                <SelectItem key={cate} value={cate}>
                  {cate}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="shrink-0">Country</Label>
        <Select onValueChange={handleCountryChange}>
          <SelectTrigger className="bg-slate-50/30 backdrop-blur-md flex items-center justify-between">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {countriesList.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="shrink-0">Price</Label>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Min"
            className="w-16 bg-slate-50/30 backdrop-blur-md"
            onChange={(e) => {
              setMinPrice(Number(e.target.value));
            }}
          />

          <span>-</span>
          <Input
            placeholder="Max"
            className="w-16 bg-slate-50/30 backdrop-blur-md"
            onChange={(e) => {
              if (e.target.value === "") {
                setMaxPrice(Number.MAX_SAFE_INTEGER);
                return;
              }
              setMaxPrice(Number(e.target.value));
            }}
          />
          <Button onClick={filter} variant="outline">
            OK
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="shrink-0">Min Order</Label>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Min order"
            className="bg-slate-50/30 backdrop-blur-md"
            onChange={(e) => {
              setMinOrder(Number(e.target.value));
            }}
          />
          <Button onClick={filter} variant="outline">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
