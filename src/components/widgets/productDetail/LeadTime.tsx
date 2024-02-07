import React from "react";

export default function LeadTime(props: {
  leadTime: { [key: string]: string | number };
  unit: string;
}) {
  const leadTime = props.leadTime,
    unit = props.unit;
  return (
    <div className="my-4 ml-8">
      <h1 className="font-bold my-4">Lead Time</h1>
      <table className="table-fixed w-[97%] rounded-lg overflow-clip">
        <tbody className="mx-auto">
          <tr className="border border-slate-200">
            <td className=" w-[20%] px-2 font-medium">{`Quantity (${unit}s)`}</td>
            {Object.keys(leadTime).map((lt: string, idx) => (
              <td key={idx} className=" p-4 border border-slate-200">
                {lt}
              </td>
            ))}
          </tr>
          <tr className="border border-slate-200">
            <td className="font-medium w-[20%] px-2">{`Lead time (days)`}</td>
            {Object.values(leadTime).map((lt: string | number, idx) => (
              <td key={idx} className=" p-4 border border-slate-200">
                {lt}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
