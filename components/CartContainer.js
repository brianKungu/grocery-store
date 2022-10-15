import React from "react";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
export default function CartContainer() {
  const [{ cartShow }, dispatch] = useStateValue();
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed top-0 right-0 flex flex-col h-screen bg-green-100 md:w-[375px] drop-shadow-md z-[101] w-full"
      >
        <div className="flex items-center justify-between w-full p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
            <BiArrowBack className="text-3xl text-green-900 transition duration-500 hover:text-green-500 " />
          </motion.div>
          <p className="text-lg font-semibold text-green-900">Cart</p>
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 text-base text-green-900 bg-green-200 rounded-md cursor-pointer hover:shadow-md hover:bg-green-300"
          >
            Clear <RiRefreshFill />
          </motion.p>
        </div>
        {/* bottom section */}
        <div className="w-full h-full bg-green-700 rounded-t-[2rem] flex flex-col">
          <div className="flex flex-col gap-3 px-6 py-10 w-fulll h-340 md:h-42 overfloy-y-scroll scrollbar-none">
            {/* cart item */}
            <div className="flex items-center w-full gap-2 p-1 px-2 bg-green-600 rounded-md">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/deli-grocery-79f97.appspot.com/o/images%2F1665740149179-carrotsOne.png?alt=media&token=6da036ea-6ee5-4402-a78c-509fae60d160"
                alt="photo"
                className="w-20 h-20 maw-w-[60px] rounded-md object-contain"
              />
              {/* name section */}
              <div className="flex flex-col gap-2 text-green-100">
                <p className="text-xl">Carrots</p>
                <p className="block text-base font-semibold">KES.200</p>
              </div>
              {/* button section */}
              <div className="flex items-center gap-2 ml-auto cursor-pointer group">
                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiMinus className="text-green-100" />
                </motion.div>
                <p className="flex items-center justify-center w-5 h-5 text-sm text-green-100 bg-green-600 rounded-sm">
                  2
                </p>
                <motion.div whileTap={{ scale: 0.75 }}>
                  <BiPlus className="text-green-100" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* cart total section */}
          <div className="flex-1 w-full bg-green-800 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-4">
            <div className="flex items-center justify-between w-full text-lg text-green-100">
              <p>Sub total</p>
              <p>{"KES"} 200</p>
            </div>
            <div className="flex items-center justify-between w-full text-lg text-green-100">
              <p>Delivery</p>
              <p>{"KES"} 100</p>
            </div>
            <div className="w-full border-b border-green-600"></div>

            <div className="flex items-center justify-between w-full text-xl font-semibold text-green-200">
              <p>Total</p>
              <p>{"KES"} 300</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 my-2 text-lg font-semibold uppercase transition-all duration-150 ease-out rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-50 hover:shadow-md"
            >
              Check out
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
