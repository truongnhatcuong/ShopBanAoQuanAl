// src/app/(client)/test1/page.tsx

"use client"; // Thêm dòng này

import { fetchUserBehaviorData } from "@/lib/fetchUserBehavior";
import { useEffect, useState } from "react";

const YourComponent = () => {
  const [behaviorData, setBehaviorData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserBehaviorData();
      setBehaviorData(data);
    };

    getData();
  }, []);

  return (
    <div>
      {/* Render dữ liệu hành vi */}
      {behaviorData.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
};

export default YourComponent;
