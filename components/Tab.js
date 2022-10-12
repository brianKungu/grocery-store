import Link from "next/link";
import React from "react";

export default function Tab({ name, className }) {
  return (
    <div>
      <Link href="/" passHref>
        <a className={className}>{name}</a>
      </Link>
    </div>
  );
}
