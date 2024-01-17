// "use client";
import React from "react";
import { ProviderInfo } from "@/types/provider";
// import { ProviderProfile, RequestQuotation } from "../home-inspection";
// import { HOME_FEATURES, PROPERTY_TYPE } from "@/config/constant";
// import { urlFor } from "@/config/sanityConfig";
import { calculateExp } from "@/helpers/sanity/providers";
import { PROPERTY_TYPE } from "@/config/constant";
// import Image from "next/image";
// import Multiselect from "multiselect-react-dropdown";
const UpdateProviderInfo = (provider: ProviderInfo) => {
  return (
    <div className="flex flex-col gap-8 mx-auto w-full p-4 md:px-8 ">
      <div className="flex flex-col md:flex-row gap-8 max-w-screen">
        <div className="flex flex-col gap-8 max-w-2/3">
          <div className="card md:card-side shadow-sm w-full border border-slate-2 bg-slate-2">
            <figure className="md:h-full md:w-64 w-full aspect-square md:aspect-auto relative shrink-0">
              <div className="w-[320px] h-[320px] rounded-lg bg-slate-5 flex justify-center items-center cursor-pointer">
                <p className="text-slate-1"> Choose your logo</p>
              </div>
            </figure>
            <div className="card-body gap-2">
              <h1 className="card-title">{provider.company}</h1>
              <p className="">{provider.description}</p>

              <div className="flex gap-4">
                <div className="stat max-w-max border border-slate-5 rounded-lg">
                  <div className="stat-title text-slate-10">Location</div>
                  <div className="stat-value text-lg">
                    {/* {provider.serviceArea.city}, {provider.serviceArea.state} */}
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">What is your name?</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                  </div>
                </div>
                <div className="stat max-w-max border border-slate-5 rounded-lg">
                  <div className="stat-title text-slate-10">Experience</div>
                  <div className="stat-value text-lg">
                    {calculateExp(provider.established)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-xl font-medium">Featured Project</h2>
            <div className="carousel carousel-center p-4 space-x-4 bg-slate-2 rounded-lg max-w-prose "></div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">
              Bussiness hours & scheduling policy
            </h2>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
            ></textarea>

            <div className="max-w-xs gap-[1px] rounded-lg border bg-slate-3 border-slate-2 flex flex-col">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="toggle" checked />
                </label>
              </div>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div className="form-control" key={day}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{day}</span>
                    <input type="checkbox" className="toggle" checked />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">Property Type</h2>
            <select
              name="propertyTypes"
              id={`cs-propertyType`}
              className="border border-slate-200 p-2 rounded-md"
              required
            >
              {PROPERTY_TYPE.map((v) => (
                <option value={v.value} key={v.value}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium">Home Feature</h2>
            <p>
              {/* <Multiselect
                options={HOME_FEATURES}
                displayValue="title"
                placeholder="Select home features"
              /> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProviderInfo;
