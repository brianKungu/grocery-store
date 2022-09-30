import React from "react";
import Product from "./Product";
import data from "../utils/data";
export default function Products() {
  return (
    <div className="grid md:grid-cols-4 md:gap-10 gap-4 mx-2 md:mx-0">
      {data.products.map((product) => (
        <div key={product.id}>
          <Product imgSrc={product.imgSrc} productName={product.name} price={product.price}/>
        </div>
      ))}
    </div>
  );
}
