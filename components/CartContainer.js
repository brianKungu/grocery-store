import React, { useEffect, useState } from "react";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useRouter } from "next/router";

// import emptyCart from "../images/emptyCart.svg";
export default function CartContainer() {
  const [{ cartShow, cartItems, user, shippingFee, totalFee }, dispatch] =
    useStateValue();
  const [flag, setFlag] = useState(1);
  const [total, setTotal] = useState(0);
  const [shippingPrice, setshippingPrice] = useState(0);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // useEffect(() => {
  //   let itemsPrice = cartItems.reduce(function (accumulator, item) {
  //     return accumulator + item.quantity * item.price;
  //   }, 0);
  //   let shipping = itemsPrice > 500 ? 0 : 100;
  //   let totalPrice = shipping + itemsPrice;
  //   setshippingPrice(shipping);
  //   setTotal(totalPrice);
  // }, [total, flag]);

  // dispatch({
  //   action: actionType.SET_SHIPPING_FEE,
  //   shippingFee: shippingPrice,
  // });
  // dispatch({
  //   action: actionType.SET_TOTAL_FEE,
  //   totalPrice: totalFee,
  // });
  // window.alert(shippingFee);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed top-0 right-0 flex flex-col h-screen bg-green-100 md:w-[375px] drop-shadow-md z-[101] w-full overflow-y-auto scrollbar-none"
      >
        <div className="flex items-center justify-between w-full p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
            <BiArrowBack className="text-3xl text-green-900 transition duration-500 hover:text-green-500 " />
          </motion.div>
          <p className="text-lg font-semibold text-green-900">Cart</p>
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 text-base text-green-900 bg-green-200 rounded-md cursor-pointer hover:shadow-md hover:bg-green-300"
            onClick={clearCart}
          >
            Clear <RiRefreshFill />
          </motion.p>
        </div>
        {/* bottom section */}
        {cartItems && cartItems.length > 0 ? (
          <div className="w-full h-full bg-green-700 rounded-t-[2rem] flex flex-col">
            <div className="flex flex-col gap-3 px-6 py-10 overflow-y-scroll w-fulll h-340 md:h-42 scrollbar-none">
              {/* cart item */}
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                  />
                ))}
            </div>

            {/* cart total section */}
            <div className="fixed bottom-0 w-full h-[200px] gap-2 bg-green-800 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-4">
              <div className="flex items-center justify-between w-full text-lg text-green-100">
                <p>Sub total</p>
                <p>
                  ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :{" "}
                  {"KES: "}
                  <span className="font-semibold">
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </span>
                </p>
              </div>

              {user ? (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() => router.push("/shipping")}
                  className=" w-full p-2 my-2 text-lg font-semibold uppercase transition-all duration-150 ease-out rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-50 hover:shadow-md"
                >
                  Check out
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 my-2 text-lg font-semibold uppercase transition-all duration-150 ease-out rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 text-gray-50 hover:shadow-md"
                  onClick={login}
                >
                  Login to check out
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            <img
              src="./images/emptyCart.svg"
              alt="Your cart is empty"
              className="text-green-800 w-300"
            />
            <p className="text-lg font-semibold text-green-800">
              Add some items to your cart
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}
{
  /*
              <div className="flex items-center justify-between w-full text-lg text-green-100">
                <p>Delivery</p>
                <p>{shippingPrice}</p>
              </div>
              <div className="w-full border-b border-green-600"></div>

              <div className="flex items-center justify-between w-full text-xl font-semibold text-green-200">
                <p>Total</p>
                <p>
                  {"KES"} {total}
                </p>
              </div> */
}
