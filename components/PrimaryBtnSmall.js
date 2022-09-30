import React from "react";

export default function PrimaryBtnSmall({text}) {
  return (
    <div className="w-full">
      <button className="bg-green-800 text-white uppercase p-4 font-bold rounded-full shadow-lg hover:bg-green-500 w-10">
        {text}
      </button>
    </div>
  );
}
