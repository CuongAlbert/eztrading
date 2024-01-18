"use client";
import React from "react";
import { ProviderInfo } from "@/types/provider";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { updateProviderInfo } from "@/server/providers";

interface InfoEditProps {
  providerId: string;
  provider: any;
  label: string;
  field: keyof ProviderInfo;
  placeholder: string;
  source?: any;
  defaultValue: string;

  type: "textarea" | "text" | "number";
}

export const InfoEdit: React.FC<InfoEditProps> = ({
  providerId,
  label,
  field,
  placeholder,
  type,
  defaultValue,
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(defaultValue);

  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const onEditHandler = () => {
    setIsEditing(false);
  };

  const onSaveHandler = async () => {
    // console.log(key, value);
    setIsSaving(true);

    const toUpdateValue = type === "number" ? Number(value) : value;
    await updateProviderInfo(providerId, { [field]: toUpdateValue });

    setIsSaving(false);
    setIsEditing(false);
  };

  if (!isEditing)
    return (
      <div
        className="flex flex-col md:flex-row md:gap-4 gap-1 min-h-[44px] w-full p-2 hover:bg-slate-2 md:rounded-md md:items-center cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        <p className="text-slate-11 w-48  shrink-0">{label}</p>
        <div className="flex gap-4 justify-between md:justify-start md:w-full items-center">
          <p className="text-slate-12">
            {value ? value : "No value yet, click to edit"}
          </p>
          <button
            className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="w-4 h-4 text-slate-10" />
          </button>
        </div>
      </div>
    );
  if (type === "text")
    return (
      <div className="flex flex-col md:flex-row md:gap-4 gap-1 min-h-[44px] w-full px-2 group items-start md:items-center">
        <p className="text-slate-11 w-48  shrink-0">{label}</p>
        <div className="flex gap-4 justify-between md:justify-start w-full items-center">
          <input
            type="text"
            className="p-2 bg-transparent w-96 border border-slate-5 rounded-md box-border overflow-visible"
            value={value}
            id={field}
            name={field}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            defaultValue={defaultValue ? defaultValue : ""}
          />
          <div className="flex gap-4 justify-center items-center">
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
              onClick={() => onSaveHandler()}
            >
              <CheckIcon className="w-6 h-6 text-blue-10" />
            </button>
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
              onClick={() => setIsEditing(false)}
            >
              <XMarkIcon className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );

  if (type === "textarea")
    return (
      <div className="flex flex-col md:flex-row md:gap-4 gap-1 min-h-[44px] w-full px-2 group items-start md:items-center">
        <p className="text-slate-11 w-48  shrink-0 mt-2">{label}</p>
        <div className="flex gap-4 justify-between md:justify-start w-full items-center">
          <textarea
            name={field}
            id={field}
            defaultValue={defaultValue ? defaultValue : ""}
            className="flex p-2 bg-transparent w-[384px] h-48 border border-slate-5 rounded-md box-border bg-slate-1"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex gap-4 justify-center items-center">
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3 "
              onClick={() => onSaveHandler()}
            >
              <CheckIcon className="w-6 h-6 text-blue-10" />
            </button>
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
              onClick={() => setIsEditing(false)}
            >
              <XMarkIcon className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );

  if (type === "number")
    return (
      <div className="flex flex-col md:flex-row md:gap-4 gap-1 min-h-[44px] w-full px-2 group items-start md:items-center">
        <p className="text-slate-11 w-48  shrink-0">{label}</p>
        <div className="flex gap-4 justify-between md:justify-start w-full items-center">
          <input
            type="text"
            className="p-2 bg-transparent w-96 border border-slate-5 rounded-md box-border overflow-visible"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-4 justify-center items-center">
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
              onClick={() => onSaveHandler()}
            >
              <CheckIcon className="w-6 h-6 text-blue-10" />
            </button>
            <button
              className="flex h-8 w-8 justify-center items-center border border-slate-3 shadow rounded-md hover:bg-slate-3"
              onClick={() => setIsEditing(false)}
            >
              <XMarkIcon className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    );
};
