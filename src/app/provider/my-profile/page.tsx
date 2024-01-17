"use client";
import React, { useContext } from "react";
import {
  InformationCircleIcon,
  ClockIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { LogoEdit, InfoEdit } from "@/components/widgets/provider-myprofile";
import { ProviderSettingsContext } from "@/ctx/ProviderSettings";

const ProviderMyProfile = () => {
  const { provider } = useContext(ProviderSettingsContext);
  return (
    <div className="block mx-auto max-w-4xl w-full py-4">
      {!provider.verified && (
        <div className="flex flex-col gap-8 my-8">
          <div className="flex flex-row p-4 rounded-xl bg-amber-200 w-full items-center gap-4 max-w-4xl">
            <InformationCircleIcon className="w-8 h-8 text-amber-800" />
            <p className="text-amber-800">
              {" "}
              Your profile is not completed. Please complete your profile to
              appear in search results.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col md:gap-2 gap-4 my-8 border border-slate-5 px-8 py-8 md:px-8 rounded-lg ">
        <h1 className="text-2xl font-medium mb-2">Company profile</h1>
        <LogoEdit logo={provider.logo} providerId={provider.id} />
        <div className="flex md:gap-4 md:flex-row gap-1 flex-col md:h-11 w-full px-2 md:items-center">
          <p className="text-slate-11 w-48 shrink-0">Business name</p>
          <p className="text-slate-12 font-medium text-lg">
            {provider.company}
          </p>
        </div>
        <div className="flex md:gap-4 md:flex-row gap-1 flex-col md:h-11 w-full px-2 md:items-center">
          <p className="text-slate-11 w-48 shrink-0">Profile status</p>

          {provider.verified ? (
            <div className="flex gap-1 items-center justify-center px-2 py-1 rounded-full bg-green-200 text-green-800">
              <CheckBadgeIcon className="shrink-0 w-7 h-7 text-green-600" />
              <p className="shrink-0 font-medium">Verified</p>
            </div>
          ) : (
            <div className="flex gap-1 items-center justify-center px-2 py-1 rounded-full bg-yellow-200 text-yellow-800">
              <ClockIcon className="shrink-0 w-7 h-7 text-yellow-600" />
              <p className="w-full">In review</p>
            </div>
          )}
        </div>
        <div className="flex md:gap-4 md:flex-row gap-1 flex-col md:h-11 w-full px-2 md:items-center">
          <p className="text-slate-11 w-48 shrink-0">Email</p>
          <p className="text-slate-12">{provider.email}</p>
        </div>
        <div className="flex md:gap-4 md:flex-row gap-1 flex-col md:h-11 w-full px-2 md:items-center">
          <p className="text-slate-11 w-48 shrink-0">Phone number</p>
          <p className="text-slate-12">{provider.phone}</p>
        </div>

        <InfoEdit
          label="Address"
          providerId={provider.id}
          provider={provider}
          field="address"
          placeholder="Your business address"
          type="text"
          defaultValue={provider.address || ""}
        />

        <InfoEdit
          label="Description"
          providerId={provider.id}
          provider={provider}
          field="description"
          placeholder="Describe your bussiness"
          type="textarea"
          defaultValue={provider.description || ""}
        />
      </div>
      <div className="flex flex-col gap-2 my-8 border border-slate-5 px-8 py-8 md:px-8 rounded-lg ">
        <h1 className="text-2xl font-medium mb-2">Service details</h1>
        <InfoEdit
          label="Shipping Information"
          providerId={provider.id}
          provider={provider}
          field="shipping"
          placeholder="Describe your shipping information"
          type="textarea"
          defaultValue={provider.shipping || ""}
        />
        <InfoEdit
          label="Payment Terms"
          providerId={provider.id}
          provider={provider}
          field="paymentTerms"
          placeholder="Describe your payment terms"
          type="textarea"
          defaultValue={provider.paymentTerms || ""}
        />
      </div>
    </div>
  );
};

export default ProviderMyProfile;
