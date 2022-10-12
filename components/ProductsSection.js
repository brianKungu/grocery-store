import React from "react";
import Tabs from "./Tabs";
import Products from "./Products";
import { useStateValue } from "../context/StateProvider";
export default function ProductsSection() {
  const [{foodItems}, dispatch] = useStateValue();
  return (
    <div className="w-full mx-auto max-w-7xl my-6 products">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-4xl text-green-800 font-bold uppercase">
          Our products
        </h2>

        <div className="w-full flex items-center justify-center flex-col">
          <div>
            <Tabs />
          </div>
        </div>
        <div className="max-w-6xl w-full">
          <Products data={foodItems?.filter((n) => n.category === "Fruits")}/>
        </div>
      </div>
    </div>
  );
}
