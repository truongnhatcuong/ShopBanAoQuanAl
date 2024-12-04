import React from "react";
interface ITyle {
  title1: string;
  title2: string;
}
const Title = ({ title1, title2 }: ITyle) => {
  return (
    <div className="inline-flex items-center gap-2 mb-2">
      <p className="text-gray-700 prata-regular text-2xl">
        <span className="family"> {title1}</span>{" "}
        <span className="text-3xl ">{title2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-slate-800"></p>
    </div>
  );
};

export default Title;
