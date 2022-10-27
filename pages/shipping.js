import Head from "next/head";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import data from "../utils/data";
import { useForm } from "react-hook-form";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Shipping() {
  const router = useRouter();
  const [{ shippingAddress, user }, dispatch] = useStateValue();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const submitHandler = ({
    fullName,
    phoneNumber,
    location,
    estate,
    houseNumber,
  }) => {
    dispatch({
      type: actionType.SET_SHIPPING_ADDRESS,
      shippingAddress: { fullName, phoneNumber, location, estate, houseNumber },
    });
    // console.log(shippingAddress);
    Cookies.set("shippingAddress", shippingAddress);
    // localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    router.push("/payment");
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("phoneNumber", shippingAddress.phoneNumber);
    setValue("location", shippingAddress.location);
    setValue("estate", shippingAddress.estate);
    setValue("houseNumber", shippingAddress.houseNumber);
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>Shipping address</title>
        </Head>
        <main className="w-full min-h-screen my-4 text-green-800">
          <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="text-xl font-bold uppercase">Shipping address</h1>
            <div className="gap-4 w-[90%] md:w-[75%] border bg-green-100 border-green-300 rounded-md p-4 mt-4 flex flex-col items-center justify-center">
              <div
                className={`${
                  errors.fullName
                    ? "flex items-center justify-center w-full gap-2 p-2 rounded-md text-red-900 border border-red-300"
                    : "flex items-center justify-center w-full gap-2 py-2 border-b border-green-300"
                }`}
              >
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 w-full h-full p-2 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-green-800"
                  {...register("fullName", {
                    required: true,
                    minLength: {
                      value: 10,
                    },
                  })}
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                <label className="text-sm">Full Name</label>
              </div>
              {errors.fullName ? (
                errors.fullName.type === "minLength" ? (
                  <p className="text-red-500">Full name too short!</p>
                ) : (
                  <p className="text-red-500">Kindly provide your full name!</p>
                )
              ) : (
                ""
              )}
              <div
                className={`${
                  errors.phoneNumber
                    ? "flex items-center justify-center w-full gap-2 p-2 rounded-md text-red-900 border border-red-300"
                    : "flex items-center justify-center w-full gap-2 py-2 border-b border-green-300"
                }`}
              >
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  className="flex-1 w-full h-full p-2 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-green-800"
                  {...register("phoneNumber", {
                    required: true,
                    maxLength: {
                      value: 10,
                    },
                  })}
                  aria-invalid={errors.phoneNumber ? "true" : "false"}
                />
                <label className="text-sm">Phone Number</label>
              </div>
              {errors.phoneNumber ? (
                errors.phoneNumber.type === "maxLength" ? (
                  <p className="text-red-500">Enter a valid phone number!</p>
                ) : (
                  <p className="text-red-500">
                    Kindly provide your phone number!
                  </p>
                )
              ) : (
                ""
              )}
              <div className="w-full">
                <select
                  className="w-full p-2 text-base font-semibold bg-transparent border border-green-300 rounded-md outline-none hover:text-green-800 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300"
                  {...register("location", {
                    required: true,
                  })}
                  name="location"
                >
                  <option value="other" className="font-semibold">
                    Select location
                  </option>
                  {data.phases &&
                    data.phases.map((phase) => (
                      <option
                        key={phase.id}
                        value={phase.name}
                        className="font-semibold border-none outline-none bg-inherit"
                      >
                        {phase.name}
                      </option>
                    ))}
                </select>
              </div>
              <div
                className={`${
                  errors.estate
                    ? "flex items-center justify-center w-full gap-2 p-2 rounded-md text-red-900 border border-red-300"
                    : "flex items-center justify-center w-full gap-2 py-2 border-b border-green-300"
                }`}
              >
                <input
                  type="text"
                  name="estate"
                  placeholder="Estate name"
                  className="flex-1 w-full h-full p-2 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-green-800"
                  {...register("estate", {
                    required: true,
                    minLength: {
                      value: 5,
                    },
                  })}
                />
                <label className="text-sm">Estate</label>
              </div>
              {errors.estate ? (
                errors.estate.type === "minLength" ? (
                  <p className="text-red-500">
                    Provide a better name for your estate!
                  </p>
                ) : (
                  <p className="text-red-500">
                    Kindly provide the name of the estate you reside in!
                  </p>
                )
              ) : (
                ""
              )}
              <div
                className={`${
                  errors.houseNumber
                    ? "flex items-center justify-center w-full gap-2 p-2 rounded-md text-red-900 border border-red-300"
                    : "flex items-center justify-center w-full gap-2 py-2 border-b border-green-300"
                }`}
              >
                <input
                  type="text"
                  placeholder="House number"
                  name="houseNumber"
                  className="flex-1 w-full h-full p-2 text-lg font-semibold bg-transparent border-none outline-none placeholder:text-green-800"
                  {...register("houseNumber", {
                    required: true,
                    maxLength: {
                      value: 3,
                    },
                  })}
                />
                <label className="text-sm">House number</label>
              </div>

              {errors.houseNumber ? (
                errors.houseNumber.type === "maxLength" ? (
                  <p className="text-red-500">Provide a valid house number!</p>
                ) : (
                  <p className="text-red-500">
                    Kindly provide the house number of the estate you reside in!
                  </p>
                )
              ) : (
                ""
              )}
              <div className="flex items-center w-full">
                <button
                  type="submit"
                  className="w-full px-12 py-2 ml-0 text-lg font-semibold text-white border-none rounded-lg outline-none bg-emerald-500 md:ml-auto md:w-auto"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </main>
      </Layout>
    </>
  );
}
