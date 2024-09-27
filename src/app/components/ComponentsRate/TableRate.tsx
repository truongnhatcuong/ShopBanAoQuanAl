"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
interface Irate {
  rating_id: number;
  rating: number;
}
interface ITableRate {
  rate: Irate[];
}
const TableRate = ({ rate }: ITableRate) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Ratings
      </h2>
      <ul className="space-y-4">
        {rate.map((rating) => (
          <li
            key={rating.rating_id}
            className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-700 mr-4">
                Rating ID: {rating.rating_id}
              </span>
              <div className="flex">
                {Array(rating.rating)
                  .fill(0)
                  .map((_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                {Array(5 - rating.rating)
                  .fill(0)
                  .map((_, index) => (
                    <FaStar key={index} className="text-gray-300" />
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableRate;
