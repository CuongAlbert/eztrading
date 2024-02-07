"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

export default function ProductInfor(props: {
  attributes: { [key: string]: string };
  other: boolean;
}) {
  const [viewOtherAttributes, setViewOtherAttributes] = useState<boolean>(true);
  const attributes = props.attributes;
  const other = props.other;
  return (
    <div>
      {!other ? (
        <h1 className="lg:ml-8 font-bold my-4">Key Attributes</h1>
      ) : (
        <h1 className="lg:my-4 ml-8">Other attributes</h1>
      )}
      <div className="overflow-x-auto">
        <table className="lg:table-fixed lg:w-[97%] lg:ml-8 rounded-lg border-collapse border border-slate-500">
          <tbody className="lg:w-[80%] mx-auto rounded-lg  border border-slate-200">
            {!other &&
              Object.keys(attributes)
                .slice(0, 5)
                .map((at: string, idx) => (
                  <tr
                    key={idx}
                    className={`border border-slate-200 rounded-3xl `}
                  >
                    <td className="lg:w-[25%] whitespace-nowrap p-4 border border-slate-200 font-medium overflow-clip ">
                      {at}
                    </td>
                    <td className="p-4 whitespace-nowrap">{attributes[at]}</td>
                  </tr>
                ))}
            {other &&
              Object.keys(attributes)
                .slice(5)
                .map((at: string, idx) => (
                  <tr
                    key={idx}
                    className={
                      !other
                        ? `border-2 border-blue-400`
                        : idx == 0
                          ? `border-2 border-blue-400`
                          : `${
                              viewOtherAttributes
                                ? "hidden border-2 border-blue-400"
                                : "border-2 border-blue-400"
                            }`
                    }
                  >
                    <td className="bg-slate-50/50 backdrop-blur-md rounded-xl w-[40%] p-4 border border-slate-200">
                      {at}
                    </td>
                    <td className="p-2">{attributes[at]}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {other && (
        <div className="flex items-center p-2">
          <p
            className="underline hover:text-blue-400 cursor-pointer ml-12"
            onClick={() => setViewOtherAttributes(!viewOtherAttributes)}
          >
            {viewOtherAttributes ? "Show more" : "Show less"}
          </p>
          {viewOtherAttributes ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </div>
      )}
    </div>
  );
}
