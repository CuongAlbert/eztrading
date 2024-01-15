"use client";
import { Button } from "@/components/common";
import { CameraIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export const SearchBar = () => {
  const [text, setText] = useState("");
  const submitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);
    setText("");
  };
  return (
    <form
      className="relative w-[90%] md:w-[50%] h-16 mx-auto my-10 px-2 md:px-4 py-8 flex gap-3 sm:gap-1 justify-between items-center rounded-full border-solid border-2 border-blue-950"
      onSubmit={submitHandle}
    >
      <input
        className="outline-none w-full"
        type="text"
        placeholder="Enter your product"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <div className="flex gap-1 md:gap-4 justify-around items-center">
        {/* <CameraIcon className="w-6 h-6" /> */}
        <Button variant={"primary"}>Search</Button>
        {/* <button type="submit">Search</button> */}
      </div>
    </form>
  );
};
