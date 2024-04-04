import React from "react";
import { SendRequest } from "../send-request";
export default function Sample(props: {
  sample: { [key: string]: number };
  unit: string;
  product: string;
  lang: { [key: string]: string };
}) {
  const sample = props.sample;
  const unit = props.unit;
  return (
    <div className="">
      <h1 className="font-bold my-4 text-xl">{props.lang["title"]}</h1>

      <p className="my-4">{`${props.lang["row-max-order"]} ${
        sample.maxSample
      } ${sample.max == 1 ? unit : `${unit}s`}`}</p>
      <p className="my-4">
        {/* {`Sample price: `} */}
        {props.lang["row-sample-price"]}
        <span className="font-bold">
          US${sample.samplePrice.toFixed(2)}/{unit}
        </span>
      </p>
      {/* <Button variant="primary" className="my-4">{`Order sample`}</Button> */}
      <SendRequest product={props.product} />
    </div>
  );
}
