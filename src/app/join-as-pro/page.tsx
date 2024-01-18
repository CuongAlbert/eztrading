import React from "react";
import { RegisterBasicInfo } from "@/components/widgets/provider";
import { Logo } from "@/components/common";
const JoinAsPro = () => {
  return (
    <main
      className="w-full h-full flex flex-col md:flex-row p-2 md:p-8 md:justify-center items-center overflow-auto"
      style={{
        backgroundImage: "url(" + "/images/bg-pttrn.png" + ")",
        backgroundRepeat: "repeat",
        // backgroundSize: "cover",
      }}
    >
      {/* <div className=" p-8 md:p-16 flex flex-col md:flex-row gap-8 md:justify-center md:items-center"> */}
      <div className="flex flex-col w-full p-2 md:p-8 lg:max-w-2xl justify-start items-start gap-8 flex-1">
        <div>
          <Logo />
        </div>
        <div className="w-36 h-1 rounded-full bg-blue-10" />
        <div className="flex flex-col w-full flex-1">
          <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold">{`We're in the business of growing yours`}</h1>
          <p className="py-6 md:text-lg lg:text-xl">
            {`Create your EZTRADING profile, and get in front of`}{" "}
            <span className="font-bold"> many homeowners</span>
            {`. More eyes on your business means more opportunity to
                connect with your next customer.`}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-2 md:p-8 items-center">
        <RegisterBasicInfo />
      </div>
      {/* </div> */}
    </main>
  );
};

export default JoinAsPro;
