import React from "react";
import { BsCart3 } from "react-icons/bs";

export default function Product({ imgSrc, productName, price }) {
  return (
    <>
      <div className="bg-green-100 rounded-md p-2 shadow-md">
        <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={imgSrc}
            alt=""
            className="object-cover object-center w-full group-hover:opacity-75"
          />
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-green-800">
            <h3 className="font-bold">{productName}</h3>
            <h4 className="font-semibold">{`KES ${price}`}</h4>
          </div>
          <div>
            <div>
              <BsCart3 className="text-green-800" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
