import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import Cookies from "js-cookie";
import { saveOrders } from "../../utils/firebaseFunctions";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase.config";

// import Loader from "../components/Loader";

export default function PlaceOrder() {
  const [
    { shippingAddress, cartItems, user, savePaymentMethod, orders },
    dispatch,
  ] = useStateValue();
  const [shippingPrice, setshippingPrice] = useState();
  const [total, setTotal] = useState();
  const [itemsPrice, setitemsPrice] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alert, setAlert] = useState("danger");
  const [fields, setFields] = useState(false);

  const router = useRouter();
  console.log(orders);
  useEffect(() => {
    if (!user) {
      setMsg("You need to login to your account first!");
      router.push("/");
    }
    const fetchOrder = async () => {
      try {
        // dispatch({ type: "FETCH_REQUEST" });
        const { data } = await getDocs(
          query(collection(firestore, "orders"), orderBy("id", "desc"))
        );
        return items.docs.map((doc) => doc.data());
      } catch (error) {
        setMsg(error);
      }
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrize = round2(
      cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    let shipping = itemsPrice > 500 ? 0 : 100;
    let totalPrice = itemsPrice + shipping;
    setitemsPrice(itemsPrize);
    setshippingPrice(shipping);
    setTotal(totalPrice);
  }, [total]);

  //   const placeOrderHandler = () => {
  //     // setisLoading(true);
  //     try {
  //       const data = {
  //         id: `${Date.now()}`,
  //         orderItems: cartItems,
  //         shippingAddress,
  //         savePaymentMethod,
  //         itemsPrice,
  //         shippingPrice,
  //         total,
  //         isPaid: { type: Boolean, required: true, default: false },
  //         isDelivered: { type: Boolean, required: true, default: false },
  //         paidAt: `${Date.now()}`,
  //         deliveredAt: `${Date.now()}`,
  //       };
  //       saveOrders(data);
  //       console.log(data);

  //       Cookies.remove("cartItems");
  //       router.push(`/order/${data.id}`);
  //       setisLoading(false);
  //       setFields(true);
  //       setMsg("Order placed successfully");
  //       setAlert("success");
  //       dispatch({
  //         type: actionType.SET_CARTITEMS,
  //         cartItems: [],
  //       });
  //       setTimeout(() => {
  //         setFields(false);
  //       }, 4000);
  //     } catch (error) {
  //       setMsg(error);
  //       // setFields(true);
  //       setAlert("danger");
  //       setTimeout(() => {
  //         setFields(false);
  //         setisLoading(false);
  //       }, 4000);
  //     }
  //   };

  // const placeOrderHandler = () => {};
  return (
    <Layout>
      <Head>
        <title>Place Order</title>
      </Head>
      <main className="w-full min-h-screen px-6 py-6 mx-auto text-green-800 max-w-7xl md:px-2">
        <h1 className="text-xl font-bold uppercase">Order {orders.id}</h1>
        <div>
          {fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-md text-center text-lg font-semibold ${
                alert === "danger"
                  ? "bg-red-300 text-red-800"
                  : "bg-emerald-300 text-emerald-800"
              }`}
            >
              {msg}
            </motion.p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 my-6 md:gap-2 md:grid-cols-3">
          <div className="bg-green-200 rounded-md shadow-xl md:col-span-2">
            <div className="flex flex-col gap-2 p-4">
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">
                  shipping address
                </h1>
                <div className="flex flex-wrap gap-2 pt-4 text-sm">
                  <p className="font-semibold">Full name:</p>
                  {shippingAddress.fullName} |
                  <p className="font-semibold">Phone number:</p>
                  {shippingAddress.phoneNumber} |
                  <p className="font-semibold">Location:</p>
                  {shippingAddress.location} |
                  <p className="font-semibold">Estate:</p>
                  {shippingAddress.estate} |
                  <p className="font-semibold">House number:</p>
                  {shippingAddress.houseNumber}
                </div>
              </div>
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">
                  payment method
                </h1>
                <div className="pt-4">
                  <p className="capitalize">{savePaymentMethod}</p>
                </div>
              </div>
              <div className="py-4 border-b border-b-green-300">
                <h1 className="text-xl font-semibold uppercase">order items</h1>
                <div className="w-full pt-4">
                  <table className="w-full table-auto">
                    <thead className="capitalize bg-green-400 border-b rounded-md border-b-green-300">
                      <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody className="items-center text-lg text-center capitalize">
                      {orders.orderItems &&
                        orders.orderItems.map((item) => (
                          <tr key={item.id}>
                            <th className="flex items-center justify-center">
                              <img
                                src={item.imageURL}
                                alt="image product"
                                className="object-cover object-center w-16 h-16 rounded-md"
                              />
                            </th>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-green-200 rounded-md md:cols-span-1 md:h-[280px]">
            <div className="p-4">
              <div className="py-4">
                <h1 className="text-xl font-semibold uppercase">
                  order summary
                </h1>
                <div className="flex items-center justify-between pt-4 text-lg">
                  <p>Items</p>
                  <p>
                    {"KES"} {orders.itemsPrice}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 text-lg">
                  <p>Shipping</p>
                  <p>
                    {"KES"} {orders.shippingPrice}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 text-lg font-bold">
                  <p>Total:</p>
                  <p>
                    {"KES"} {orders.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
