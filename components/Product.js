import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

const item = [];
export default function Product({ imgSrc, productName, price }) {
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  const addToCart = (item) => {
    // console.log([...item]);
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });

    localStorage.setItem("cartItems").JSON.stringify(items);
  };
  return (
    <>
      <div className="p-2 transition duration-500 bg-green-100 rounded-md shadow-md hover:scale-105">
        <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={imgSrc}
            alt=""
            className="object-cover object-center w-full h-[200px] group-hover:opacity-75"
          />
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-green-800">
            <h3 className="font-bold">{productName}</h3>
            <h4 className="font-semibold">{`KES ${price}`}</h4>
          </div>
          <motion.div whileTap={{ scale: 0.75 }}>
            <BsCart3
              className="text-green-800"
              onClick={() => setItems([...cartItems, item])}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
