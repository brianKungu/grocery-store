import React, { useState } from "react";
import Tab from "./Tab";
import data from "../utils/data";

export default function Tabs() {
  const [filter, setFilter] = useState("fruits");
  return (
    <div className="flex w-full space-x-4 mb-8 flex-wrap justify-center">
      {data.categories.map((category) => (
        <div key={category.id} className="mt-6">
          <Tab
            name={category.name}
            className={` ${
              filter === category.slug
                ? "bg-green-500"
                : "hover:bg-green-500 bg-green-800"
            }  text-white font-medium px-4 py-2 rounded-full`}
          />
        </div>
      ))}
    </div>
  );
}
