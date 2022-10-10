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
} from "react-icons/ai";

import { Transition, Popover } from "@headlessui/react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const navigation = [
  // {
  //   name: "New Item",
  //   href: "/CreateContainer",
  //   current: false,
  //   icon: AiOutlinePlus,
  // },
  { name: "Home", href: "/", current: false, icon: AiOutlineHome },
  { name: "Cart", href: "#", current: false, icon: AiOutlineShoppingCart },
];
export default function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);

  const add = () => {
    setCount((count += 1));
  };

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
  return (
    <Popover className="sticky bg-green-50 top-0">
      <div className="mx-auto max-w-7xl px-6 md:px-2">
        <div className="flex items-center justify-between border-b-2 border-green-100 py-6 md:justify-start md:space-x-10 w-full">
          <div className="flex justify-start">
            <Link href="/" passHref>
              <a className="font-bold text-3xl text-green-800 uppercase font-sans">
                Deli grocery
              </a>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 flex-1 items-center justify-center">
            <a
              href=""
              className="-m-3 flex items-center rounded-md p-3 hover:bg-green-200"
            >
              <AiOutlineHome
                className="h-6 w-6 flex-shrink-0 hover:text-green-500 text-green-800"
                aria-hidden="true"
              />
              <span className="ml-3 text-base font-medium hover:text-green-500 text-green-800">
                Home
              </span>
            </a>
            <a
              href=""
              className="-m-3 flex items-center rounded-md p-3 hover:bg-green-200"
            >
              <AiOutlineShoppingCart
                className="h-6 w-6 flex-shrink-0 hover:text-green-500 text-green-800"
                aria-hidden="true"
              />
              <span className="mx-1 text-base font-medium hover:text-green-500 text-green-800">
                Cart
              </span>
              <span className="text-xs w-8 h-5 bg-green-200 text-green-800 rounded-md flex items-center justify-center">
                {count}
              </span>
            </a>
            <button onClick={add}>click me</button>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-green-50 p-2 text-green-800 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
              <span className="sr-only">Open menu</span>
              <AiOutlineAlignRight className="text-xl" />
            </Popover.Button>
          </div>
          <div className="hidden md:inline-flex relative">
            <button
              onClick={login}
              className="bg-green-800 text-white uppercase p-4 font-bold rounded-full shadow-lg hover:bg-green-500"
            >
              {user ? user.displayName : `Get Started`}
            </button>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-green-100 shadow-md rounded-lg flex flex-col absolute top-20 right-0"
              >
                {user && user.email === "bkungu07@gmail.com" && (
                  <Link href={"/CreateContainer"}>
                    <p className="font-medium px-4 py-2 flex items-center gap-3 cursor-pointer transition-all duration-100 ease-in-out text-base text-green-800 hover:bg-green-200 bg-green-100 rounded-md">
                      New Item <AiOutlinePlus />
                    </p>
                  </Link>
                )}
                <p className="font-medium px-4 py-2 flex items-center gap-3 cursor-pointer transition-all duration-100 ease-in-out text-base text-green-800 hover:bg-green-200 bg-green-100 rounded-md" onClick={logout}>
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
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-green-100 rounded-md bg-green-50 shadow-md ring-1 ring-green-200 ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <h3 className="uppercase font-bold text-green-800">
                  Deli grocery
                </h3>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-green-50 p-2 text-green-800 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
                    <span className="sr-only">Close Menu</span>
                    <AiOutlineClose aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <div className="grid gap-y-8">
                  {user && user.email === "bkungu07@gmail.com" && (
                    <Link href={"/CreateContainer"}>
                      <a className="-m-3 flex items-center rounded-md p-3 hover:bg-green-200">
                        <AiOutlinePlus
                          className="h-6 w-6 flex-shrink-0 text-green-800"
                          aria-hidden="true"
                        />{" "}
                        <span className="ml-3 text-base font-medium text-green-800">
                          New Item
                        </span>
                      </a>
                    </Link>
                  )}
                  {navigation.map((nav) => (
                    <a
                      key={nav.name}
                      href={nav.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-green-200"
                    >
                      <nav.icon
                        className="h-6 w-6 flex-shrink-0  text-green-800"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-green-800">
                        {nav.name}
                      </span>
                    </a>
                  ))}
                  <div className="flex bg-green-200 hover:bg-green-300 cursor-pointer py-3 px-1 rounded-md">
                    <AiOutlineLogout
                      className="h-6 w-6 flex-shrink-0 text-green-800"
                      aria-hidden="true"
                    />
                    <span
                      className="ml-3 text-base font-medium text-green-800"
                      onClick={logout}
                    >
                      Logout{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
