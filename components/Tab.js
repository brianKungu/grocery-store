import Link from "next/link";
import React from "react";

export default function Tab({ name, className, onClick }) {
  return (
    <div onClick={onClick}>
      <div className={className}>{name}</div>
    </div>
  );
}
