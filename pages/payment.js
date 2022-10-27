import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState();
  const router = useRouter();
  const [{ shippingAddress, user, savePaymentMethod }, dispatch] =
    useStateValue();

  // console.log(shippingAddress);
  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      if (!shippingAddress) {
        window.alert("Shipping details is required!");
        router.push("/shipping");
      } else {
        setPaymentMethod(Cookies.get("paymentMethod") || "");
      }
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      window.alert("Payment method is required!");
    } else {
      dispatch({
        type: actionType.SET_PAYMENT_METHOD,
        savePaymentMethod: paymentMethod,
      });
      Cookies.set("paymentMethod", savePaymentMethod);
      router.push("/placeorder");
    }
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    if (!shippingAddress) {
      window.alert("Shipping details is required!");
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Payment Method</title>
      </Head>

      <main className="w-full min-h-screen px-6 my-4 text-green-800">
        <div className="w-full max-w-2xl py-6 mx-auto text-xl font-bold md:px-2">
          <h1 className="uppercase">Payment method</h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center w-full items-left"
          >
            <div className="my-4">
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="accountType"
                    value="cash"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 font-normal">Cash</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    name="accountType"
                    value="mpesa"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 font-normal">Mpesa</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 py-4">
              <button
                type="submit"
                className="w-full px-12 py-2 ml-0 text-lg font-semibold text-white border-none rounded-lg outline-none bg-emerald-500 md:ml-auto md:w-full hover:bg-emerald-600"
              >
                Continue
              </button>
              <button
                type="button"
                className="w-full px-12 py-2 ml-0 text-lg font-semibold text-white bg-gray-500 border-none rounded-lg outline-none md:ml-auto md:w-full hover:bg-gray-400"
                onClick={() => router.push("/shipping")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
}
