import { React, useState, Fragment } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineAlignRight,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";

import { Transition, Popover } from "@headlessui/react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <Popover className="sticky top-0 bg-green-50">
      <div className="px-6 mx-auto max-w-7xl md:px-2">
        <div className="flex items-center justify-between w-full py-6 border-b-2 border-green-100 md:justify-start md:space-x-10">
          <div className="flex justify-start">
            <Link href="/" passHref>
              <a className="font-sans text-3xl font-bold text-green-800 uppercase">
                Deli grocery
              </a>
            </Link>
          </div>
          <div className="items-center justify-center flex-1 hidden space-x-4 md:flex">
            <Link href="/" passHref>
              <a className="flex items-center p-3 -m-3 rounded-md hover:bg-green-200">
                <AiOutlineHome
                  className="flex-shrink-0 w-6 h-6 text-green-800 hover:text-green-500"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base font-medium text-green-800 hover:text-green-500">
                  Home
                </span>
              </a>
            </Link>
            <a
              className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-green-200"
              onClick={showCart}
            >
              <AiOutlineShoppingCart
                className="flex-shrink-0 w-6 h-6 text-green-800 hover:text-green-500"
                aria-hidden="true"
              />
              <span className="mx-1 text-base font-medium text-green-800 hover:text-green-500">
                Cart
              </span>
              {cartItems && cartItems.length > 0 && (
                <span className="px-4 py-1 ml-2 text-sm font-semibold text-center text-green-800 bg-green-300 rounded-md">
                  {cartItems.length}
                </span>
              )}
            </a>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-green-800 rounded-md bg-green-50 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
              <span className="sr-only">Open menu</span>
              <AiOutlineAlignRight className="text-xl" />
            </Popover.Button>
          </div>
          <div className="relative hidden md:inline-flex">
            <button
              onClick={login}
              className="p-4 font-bold text-white uppercase bg-green-800 rounded-full shadow-lg hover:bg-green-500"
            >
              {user ? user.displayName : `Get Started`}
            </button>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute right-0 flex flex-col w-40 bg-green-100 rounded-lg shadow-md top-20"
              >
                {user && user.email === "bkungu07@gmail.com" && (
                  <div>
                    <Link href={"/CreateContainer"}>
                      <p className="flex items-center gap-3 px-4 py-2 text-base font-medium text-green-800 transition-all duration-100 ease-in-out bg-green-100 rounded-md cursor-pointer hover:bg-green-200">
                        New Item <AiOutlinePlus />
                      </p>
                    </Link>
                  </div>
                )}
                <p
                  className="flex items-center gap-3 px-4 py-2 text-base font-medium text-green-800 transition-all duration-100 ease-in-out bg-green-100 rounded-md cursor-pointer hover:bg-green-200"
                  onClick={logout}
                >
                  Logout <AiOutlineLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="divide-y-2 divide-green-100 rounded-md shadow-md bg-green-50 ring-1 ring-green-200 ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-green-800 uppercase">
                  Deli grocery
                </h3>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-green-800 rounded-md bg-green-50 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
                    <span className="sr-only">Close Menu</span>
                    <AiOutlineClose aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <div className="grid gap-y-8">
                  {user && user.email === "bkungu07@gmail.com" && (
                    <Link href={"/CreateContainer"}>
                      <a className="flex items-center p-3 -m-3 rounded-md hover:bg-green-200">
                        <AiOutlinePlus
                          className="flex-shrink-0 w-6 h-6 text-green-800"
                          aria-hidden="true"
                        />{" "}
                        <span className="ml-3 text-base font-medium text-green-800">
                          New Item
                        </span>
                      </a>
                    </Link>
                  )}
                  {/* {navigation.map((nav) => (
                    <a
                      key={nav.name}
                      href={nav.href}
                      className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-green-200"
                      onClick={showCart}
                    >
                      <nav.icon
                        className="flex-shrink-0 w-6 h-6 text-green-800"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-green-800">
                        {nav.name}
                      </span>
                    </a>
                  ))} */}
                  <Link href="/" passHref>
                    <a className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-green-200">
                      <AiOutlineHome
                        className="flex-shrink-0 w-6 h-6 text-green-800"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-green-800">
                        Home
                      </span>
                    </a>
                  </Link>
                  <a
                    className="flex items-center p-3 -m-3 rounded-md cursor-pointer hover:bg-green-200"
                    onClick={showCart}
                  >
                    <AiOutlineShoppingCart
                      className="flex-shrink-0 w-6 h-6 text-green-800"
                      aria-hidden="true"
                    />

                    <span className="ml-3 text-base font-medium text-green-800">
                      Cart
                    </span>
                    {cartItems && cartItems.length > 0 && (
                      <span className="px-4 pt-1 ml-3 text-sm font-semibold text-center text-green-800 bg-green-300 rounded-md">
                        {cartItems.length}
                      </span>
                    )}
                  </a>

                  {user ? (
                    <div className="flex px-1 py-3 bg-green-200 rounded-md cursor-pointer hover:bg-green-300">
                      <AiOutlineLogout
                        className="flex-shrink-0 w-6 h-6 text-green-800"
                        aria-hidden="true"
                      />
                      <span
                        className="ml-3 text-base font-medium text-green-800"
                        onClick={logout}
                      >
                        Logout{" "}
                      </span>
                    </div>
                  ) : (
                    <div className="flex px-1 py-3 bg-green-200 rounded-md cursor-pointer hover:bg-green-300">
                      <AiOutlineLogin
                        className="flex-shrink-0 w-6 h-6 text-green-800"
                        aria-hidden="true"
                      />
                      <span
                        className="ml-3 text-base font-medium text-green-800"
                        onClick={login}
                      >
                        Login{" "}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
