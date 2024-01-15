import React from "react";

const Progress = ({ completion }: { completion: number }) => {
  return (
    <div className="bg-blue-4 rounded-full w-full h-2">
      <div
        className="bg-blue-10 rounded-full transition-all duration-300 ease-in-out"
        style={{
          width: `${completion * 100}%`,
          height: "100%",
        }}
      />
    </div>
  );
};

export default Progress;
