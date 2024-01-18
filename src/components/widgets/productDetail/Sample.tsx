import { Button } from "@/components/common";
import React from "react";

export default function Sample(props: {
  sample: { [key: string]: number };
  unit: string;
}) {
  const sample = props.sample,
    unit = props.unit;
  return (
    <div className="ml-8">
      <h1 className="font-bold my-4">Samples</h1>
      <p className="my-4">{`Maximum order quantity: ${sample.maxSample} ${
        sample.max == 1 ? unit : `${unit}s`
      }`}</p>
      <p className="my-4">
        {`Sample price: `}
        <span className="font-bold">
          US${sample.samplePrice.toFixed(2)}/{unit}
        </span>
      </p>
      <Button variant="primary" className="my-4">{`Order sample`}</Button>
    </div>
  );
}
