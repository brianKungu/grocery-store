import React, { useEffect, useState } from "react";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };
  const updateQty = (action, id) => {
    if (action == "add") {
      setQuantity(quantity + 1);
      // map through every element to update quantity
      cartItems.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
      });
      cartDispatch();
    } else {
      // initial state value is 1 so you need to check if 1 then remove it
      if (quantity == 1) {
        // remove id from cart items is quantity is equal to 1
        // filter returns new array with all the items except the removed item
        setItems(cartItems.filter((item) => item.id !== id));
        cartDispatch;
      } else {
        setQuantity(quantity - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    setItems(cartItems);
  }, [quantity]);
  return (
    <>
      <div
        key={item?.id}
        className="flex items-center w-full gap-2 p-1 px-2 bg-green-600 rounded-md"
      >
        <img
          src={item?.imageURL}
          alt="photo"
          className="w-20 h-20 maw-w-[60px] rounded-md object-contain"
        />
        {/* name section */}
        <div className="flex flex-col gap-2 text-green-100">
          <p className="text-xl">{item?.title}</p>
          <p className="block text-base font-semibold">{`KES ${
            parseFloat(item?.price) * quantity
          }`}</p>
        </div>
        {/* button section */}
        <div className="flex items-center gap-2 ml-auto cursor-pointer group">
          <motion.div whileTap={{ scale: 0.75 }}>
            <BiMinus
              className="text-green-100"
              onClick={() => updateQty("remove", item?.id)}
            />
          </motion.div>
          <p className="flex items-center justify-center w-5 h-5 text-sm text-green-100 bg-green-600 rounded-sm">
            {quantity}
          </p>
          <motion.div whileTap={{ scale: 0.75 }}>
            <BiPlus
              className="text-green-100"
              onClick={() => updateQty("add", item?.id)}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
