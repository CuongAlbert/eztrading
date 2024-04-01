import React from "react";

export default function LeadTime(props: {
  leadTime: { [key: string]: string | number };
  unit: string;
}) {
  const leadTime = props.leadTime,
    unit = props.unit;
  return (
    <div className="">
      <h1 className="font-bold my-4">Lead Time</h1>
      <div className="overflow-x-auto">
        <table className="lg:table-fixed w-full lg:w-[97%] rounded-lg">
          <tbody className="mx-auto">
            <tr className="border border-slate-200">
              <td className="lg:w-[20%] px-4 font-medium whitespace-nowrap">{`Quantity (${unit}s)`}</td>
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
              <td className="font-medium w-[20%] p-4  whitespace-nowrap">{`Lead time (days)`}</td>
              {Object.values(leadTime).map((lt: string | number, idx) => (
                <td
                  key={idx}
                  className=" p-4 border border-slate-200  whitespace-nowrap"
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
