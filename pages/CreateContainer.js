import Head from "next/head";
import { React, useState } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import data from "../utils/data";

export default function CreateContainer() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alert, setAlert] = useState("danger");
  return (
    <Layout>
      <Head>
        <title>Create Item</title>
      </Head>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="gap-4 w-[90%] md:w-[75%] border bg-green-100 border-green-300 rounded-md p-4 flex flex-col items-center justify-center">
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
          <div className="w-full py-2 border-b border-green-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Provide a product title"
              className="flex-1 w-full h-full text-lg bg-transparent font-semibold outline-none p-2 text-green-800 border-none placeholder:text-green-800"
            />
            <label className="text-sm text-green-800">Product title</label>
          </div>

          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="border font-semibold hover:text-green-800 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 bg-transparent outline-none w-full text-base border-green-300 rounded-md p-2"
            >
              <option value="other" className="font-semibold">
                Select Category
              </option>
              {data.categories &&
                data.categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.urlParamName}
                    className="bg-inherit font-semibold outline-none border-none"
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-green-300 w-full h-225 md:h-420 cursor-pointer rounded-md"></div>
        </div>
      </div>
    </Layout>
  );
}
