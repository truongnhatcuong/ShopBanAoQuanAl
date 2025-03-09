"use client";
import React, { useState } from "react";

const Page = () => {
  const [value0, setValue0] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(0);
  const [value9, setValue9] = useState(0);
  const [operator1, setOperator1] = useState<string>("");
  const [result, setResult] = useState(0);

  function Caculate() {
    let results = 0;
    if (operator1 == "+") {
      results =
        value0 +
        value1 +
        value2 +
        value4 +
        value5 +
        value6 +
        value7 +
        value8 +
        value9;
    } else if (operator1 == "*") {
      results =
        value0 *
        value1 *
        value2 *
        value4 *
        value5 *
        value6 *
        value7 *
        value8 *
        value9;
    }
    setResult(results);
  }

  console.log(value0);
  console.log(value1);
  console.log(value2);
  console.log(value3);
  console.log(value4);
  console.log(value5);
  console.log(value6);
  console.log(value7);
  console.log(value8);
  console.log(value9);

  console.log(result);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col mt-10">
        <div className="px-24 py-12 bg-black w-fit mb-2 text-white">
          {result}
        </div>
        <div className="flex">
          <div className=" ">
            <div className="flex gap-4 gap-y-3 ">
              {" "}
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue1(1)}
              >
                1
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue2(2)}
              >
                2
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue3(3)}
              >
                3
              </div>
            </div>
            <div className="flex gap-4 gap-y-2 mt-2">
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue4(4)}
              >
                4
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue5(5)}
              >
                5
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue6(6)}
              >
                6
              </div>
            </div>

            <div className="flex gap-4 gap-y-2 mt-2">
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue7(7)}
              >
                7
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue8(8)}
              >
                8
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue9(9)}
              >
                9
              </div>
            </div>
            <div className="flex ml-14 mt-4 ">
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={() => setValue0(0)}
              >
                0
              </div>
              <div
                className="p-4 bg-slate-500 text-white rounded-full font-bold hover:bg-slate-600 cursor-pointer "
                onClick={Caculate}
              >
                =
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-x-4 ml-4 gap-y-2">
            <div
              className="p-4 bg-yellow-600 text-white rounded-full font-bold hover:bg-yellow-700 cursor-pointer "
              onClick={() => setOperator1("+")}
            >
              +
            </div>
            <div
              className="p-4 bg-yellow-600 text-white rounded-full font-bold hover:bg-yellow-700 cursor-pointer "
              onClick={() => setOperator1("-")}
            >
              -
            </div>
            <div
              className="p-4 bg-yellow-600 text-white rounded-full font-bold hover:bg-yellow-700 cursor-pointer "
              onClick={() => setOperator1("*")}
            >
              *
            </div>
            <div
              className="p-4 bg-yellow-600 text-white rounded-full font-bold hover:bg-yellow-700 cursor-pointer "
              onClick={() => setOperator1("/")}
            >
              /
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
