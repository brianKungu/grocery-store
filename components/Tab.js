import Link from "next/link";
import React from "react";

export default function Tab({ name }) {
  return (
    <div>
      <Link href="/" passHref>
        <a className="bg-green-800 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-full">
          {name}
        </a>
      </Link>
    </div>
  );
}
