import React, { useState } from "react";
import Tabs from "./Tabs";
import Products from "./Products";
import { useStateValue } from "../context/StateProvider";
import Tab from "./Tab";
import data from "../utils/data";
export default function ProductsSection() {
  const [filter, setFilter] = useState("fruits");

  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <div className="w-full mx-auto my-6 max-w-7xl products">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-green-800 uppercase">
          Our products
        </h2>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-wrap justify-center w-full mb-8 space-x-4">
            {data.categories.map((category) => (
              <div key={category.id} className="mt-6">
                <Tab
                  name={category.name}
                  className={` ${
                    filter === category.name
                      ? "bg-green-500"
                      : "hover:bg-green-500 bg-green-800"
                  }  text-white font-medium px-4 py-2 rounded-full cursor-pointer`}
                  onClick={() => setFilter(category.name)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-6xl">
          <Products data={foodItems?.filter((n) => n.category == filter)} />
        </div>
      </div>
    </div>
  );
}
