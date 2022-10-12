import React from "react";
import Product from "./Product";
import data from "../utils/data"; 
export default function Products({data}) {
  console.log(data);
  return (
    <div className="grid md:grid-cols-4 md:gap-10 gap-4 mx-2 md:mx-0">
      {data && data.map((product) => (
        <div key={product?.id}>
          <Product imgSrc={product?.imageURL} productName={product?.title} price={product?.price}/>
        </div>
      ))}
    </div>
  );
}
