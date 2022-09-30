import React from "react";
import Tab from "./Tab";

export default function Tabs() {
  const tabs = [
    {
      id: 1,
      name: "Fruits",
    },
    {
      id: 2,
      name: "Vegetables",
    },
    {
      id: 3,
      name: "Meat",
    },
    {
      id: 4,
      name: "Eggs and dairy products",
    },
  ];
  return (
    <div className="flex w-full space-x-4 mb-8 flex-wrap justify-center">
      {tabs.map((tab) => (
        <div key={tab.id} className="mt-6">
          <Tab name={tab.name} />
        </div>
      ))}
    </div>
  );
}
