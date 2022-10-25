import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { useStateValue } from "../context/StateProvider";

export default function PlaceOrder() {
  const [{ shippingAddress }, dispatch] = useStateValue();
  return (
    <Layout>
      <Head>
        <title>Place Order</title>
      </Head>
      <main className="w-full min-h-screen px-6 py-6 mx-auto text-green-800 max-w-7xl md:px-2">
        <h1 className="text-xl font-bold uppercase">Payment method</h1>
        <div className="grid grid-cols-1 gap-6 my-6 md:gap-2 md:grid-cols-3">
          <div className="bg-green-200 rounded-md shadow-xl md:col-span-2">
            <div className="flex flex-col gap-2 p-4">
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">
                  shipping address
                </h1>
                <div className="flex flex-wrap gap-2 pt-4 text-sm">
                  <p className="font-semibold">Full name:</p>{shippingAddress.fullName} |
                  <p className="font-semibold">Phone number:</p>{shippingAddress.phoneNumber} |
                  <p className="font-semibold">Location:</p>{shippingAddress.location} |
                  <p className="font-semibold">Estate:</p>{shippingAddress.estate} |
                  <p className="font-semibold">House number:</p>{shippingAddress.houseNumber}
                  
                </div>
              </div>
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">
                  payment method
                </h1>
                <div className="pt-4">
                  <p>Cash</p>
                </div>
              </div>
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">order items</h1>
                <div className="pt-4">
                  <table>
                    <thead className="capitalize border-b border-b-green-300">
                      <th>image</th>
                      <th>name</th>
                      <th>quantity</th>
                      <th>price</th>
                    </thead>
                    <tbody className="text-lg text-center capitalize">
                      <td>
                        <img
                          src="./images/product-1.jpg"
                          alt="image product"
                          className="object-cover object-center w-16 h-16 rounded-md"
                        />
                      </td>
                      <td>tomatoes</td>
                      <td>1</td>
                      <td>50</td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-green-200 rounded-md md:cols-span-1 md:h-2/3">
            <div className="p-4">
              <div className="py-4">
                <h1 className="text-xl font-semibold uppercase">
                  order summary
                </h1>
                <div className="flex items-center justify-between pt-4 text-lg">
                  <p>Items</p>
                  <p>{"KES"} 200</p>
                </div>
                <div className="flex items-center justify-between pt-4 text-lg">
                  <p>Shipping</p>
                  <p>{"KES"} 100</p>
                </div>
                <div className="flex items-center justify-between pt-4 text-lg font-bold">
                  <p>Total:</p>
                  <p>{"KES"} 300</p>
                </div>
              </div>
              <div className="w-full">
                <button
                  type="button"
                  className="w-full py-2 font-bold text-white uppercase bg-yellow-400 rounded-md hover:bg-yellow-500"
                >
                  place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
