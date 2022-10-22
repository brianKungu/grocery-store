import React, { useEffect, useState } from "react";
import Product from "./Product";
import data from "../utils/data";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
export default function Products({ data }) {
  console.log(data);
  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addtocart();
  }, [items]);
  return (
    <div className="grid gap-4 mx-2 md:grid-cols-4 md:gap-10 md:mx-0">
      {data && data.length > 0 ? (
        data.map((product) => (
          <div key={product?.id}>
            <Product
              imgSrc={product?.imageURL}
              productName={product?.title}
              price={product?.price}
              onClick={() => setItems([...cartItems, product])}
            />
          </div>
        ))
      ) : (
        <div className="items-center col-span-4">
          <div className="flex flex-col items-center justfy-center">
            <img
              src="./images/warning.png"
              alt="warning"
              className="text-red-500 h-[200px]"
            />
            <p className="font-bold text-center text-red-500">
              Items not available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
