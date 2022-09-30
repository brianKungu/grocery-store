import React from "react";

export default function PrimaryButton({ text }) {
  return (
    <div className="w-full">
      <button className="bg-green-800 text-white uppercase p-4 font-bold rounded-full shadow-lg hover:bg-green-500">
        {text}
      </button>
    </div>
  );
}
