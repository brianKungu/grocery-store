import { React, useState, Fragment } from "react";
import PrimaryButton from "./PrimaryButton";
import PrimaryBtnSmall from "./PrimaryBtnSmall";

import Link from "next/link";
import {
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineAlignRight,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";

import { Transition, Popover } from "@headlessui/react";

const navigation = [
  {
    name: "New Item",
    href: "/CreateContainer",
    current: false,
    icon: AiOutlinePlus,
  },
  { name: "Home", href: "/", current: false, icon: AiOutlineHome },
  { name: "Cart", href: "#", current: false, icon: AiOutlineShoppingCart },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover className="sticky bg-green-50 top-0">
      <div className="mx-auto max-w-7xl px-6 md:px-2">
        <div className="flex items-center justify-between border-b-2 border-green-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" passHref>
              <a className="font-bold text-3xl text-green-800 uppercase font-sans">
                Deli grocery
              </a>
            </Link>
          </div>

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-green-50 p-2 text-green-800 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
              <span className="sr-only">Open menu</span>
              <AiOutlineAlignRight className="text-xl" />
            </Popover.Button>
          </div>
          <div className="hidden md:inline-flex">
            <PrimaryButton text="Get started" />
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
                  {navigation.map((nav) => (
                    <a
                      key={nav.name}
                      href={nav.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                    >
                      <nav.icon
                        className="h-6 w-6 flex-shrink-0 hover:text-green-500 text-green-800"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium hover:text-green-500 text-green-800">
                        {nav.name}
                      </span>
                    </a>
                  ))}
                  <div className="flex">
                    <AiOutlineLogout
                      className="h-6 w-6 flex-shrink-0 hover:text-green-500 text-green-800"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium hover:text-green-500 text-green-800">
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

{
  /* <Link href="/" passHref>
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-green-50 p-2 text-green-800 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-200">
              <span className="sr-only">Open menu</span>
              <AiOutlineShoppingCart className="text-xl" />
            </Popover.Button>
          </Link> */
}
