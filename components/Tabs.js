import React, { useState, useEffect } from "react";
import Tab from "./Tab";
import data from "../utils/data";
import { motion } from "framer-motion";
import Products from "./Products";
import { useStateValue } from "../context/StateProvider";

export default function Tabs() {
  const [filter, setFilter] = useState("fruits");
  useEffect(() => {}, [filter]);
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <>
      <div className="flex flex-wrap justify-center w-full mb-8 space-x-4">
        {data.categories.map((category) => (
          <motion.div key={category.id} className="mt-6">
            <Tab
              name={category.name}
              className={` ${
                filter === category.slug
                  ? "bg-green-500"
                  : "hover:bg-green-500 bg-green-800"
              }  text-white font-medium px-4 py-2 rounded-full cursor-pointer`}
              onClick={() => setFilter(category.slug)}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
