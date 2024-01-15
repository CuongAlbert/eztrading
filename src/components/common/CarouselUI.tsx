import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CarouselUI = (props: {
  list: any[];
  children: any;
  axis: "x" | "y";
  basis: string;
}) => {
  const list = props.list,
    children = props.children,
    axis = props.axis,
    basis = props.basis;
  return (
    <Carousel
      orientation={`${axis == "x" ? "horizontal" : "vertical"}`}
      className="w-full"
      opts={
        axis == "y"
          ? {
              align: "start",
            }
          : {}
      }
    >
      <CarouselContent className={`${axis == "x" ? "-ml-2" : "-mt-2"}`}>
        {list.map((item: any, idx) => (
          <CarouselItem
            key={idx}
            className={`${
              axis == "x" ? `pl-2 md:pl-4 ${basis}` : `pt-2 md:pt-4 ${basis}`
            }`}
          >
            {children(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`${axis == "x" ? "left-0 top-1/2" : "left-1/2 t-0"}`}
      />
      <CarouselNext
        className={`${axis == "x" ? "right-0 top-1/2" : "right-1/2 b-0"}`}
      />
    </Carousel>
  );
};
