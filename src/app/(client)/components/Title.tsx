import React from "react";

interface ITitleProps {
  title1: string;
  title2: string;
}

const Title = ({ title1, title2 }: ITitleProps) => {
  return (
    <div className="group flex items-center gap-3 mb-4 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <div className="relative">
        <p className="font-serif text-2xl tracking-wide">
          <span className="font-medium mr-1.5">{title1}</span>
          <span className="text-3xl font-semibold relative">
            {title2}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-700 dark:bg-gray-200 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </span>
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-px bg-gray-400 dark:bg-gray-500 transform group-hover:w-16 group-hover:bg-gray-700 dark:group-hover:bg-gray-200 transition-all duration-300 ease-in-out"></div>
        <div className="w-6 h-px bg-gray-700 dark:bg-gray-300 ml-0.5 transform group-hover:w-8 transition-all duration-300 ease-in-out"></div>
      </div>
    </div>
  );
};

export default Title;
