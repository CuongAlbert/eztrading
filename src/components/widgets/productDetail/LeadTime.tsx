import React from "react";

export default function LeadTime(props: {
  leadTime: { [key: string]: string | number };
  unit: string;
  lang: { [key: string]: string };
}) {
  const leadTime = props.leadTime,
    unit = props.unit,
    lang = props.lang;
  return (
    <div className="">
      <h1 className="font-bold my-4 text-xl">{lang["title"]}</h1>
      <div className="overflow-x-auto">
        <table className="lg:table-fixed w-full lg:w-[97%] rounded-lg">
          <tbody className="mx-auto">
            <tr className="border border-slate-200">
              <td className="lg:w-[20%] px-4 whitespace-nowrap bg-slate-100">{`${lang["quantity"]} (${unit})`}</td>
              {Object.keys(leadTime).map((lt: string, idx) => (
                <td
                  key={idx}
                  className=" p-4 border border-slate-200  whitespace-nowrap"
                >
                  {lt}
                </td>
              ))}
            </tr>
            <tr className="border border-slate-200 ">
              <td className="w-[20%] p-4  whitespace-nowrap bg-slate-100">
                {lang["time"]}
              </td>
              {Object.values(leadTime).map((lt: string | number, idx) => (
                <td
                  key={idx}
                  className=" p-4 border border-slate-200  whitespace-nowrap font-medium"
                >
                  {lt}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
