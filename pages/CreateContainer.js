import Head from "next/head";
import { React, useState } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import data from "../utils/data";
import Loader from "../components/Loader";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import PrimaryButton from "../components/PrimaryButton";

export default function CreateContainer() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alert, setAlert] = useState("danger");
  const [isLoading, setisLoading] = useState(false);
  const uploadImage = () => {};
  const deleteImage = () => {};
  const saveDetails = () => {};
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
          <div className="dottedContainer group flex justify-center items-center flex-col border-2 border-dotted border-green-300 w-full cursor-pointer rounded-md">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <AiOutlineCloudUpload className="text-green-800 hover:text-green-500 text-3xl" />
                        <p className="text-green-800 hover:text-green-500">
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-o h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img scr={imageAsset} alt="uploaded image" />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outiline-none hover;shadow-md duration-500 transition-all ease-in-out"
                        onClick={deleteImage}
                      >
                        <AiFillDelete className="text-green-800" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="w-full py-2 border-b border-green-300 flex items-center gap-2">
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Provide a product price"
              className="flex-1 w-full h-full text-lg bg-transparent font-semibold outline-none p-2 text-green-800 border-none placeholder:text-green-800"
            />
            <label className="text-sm text-green-800">Product price</label>
          </div>
          <div className="flex items-center w-full">
            <button
              type="button"
              className="bg-emerald-500 ml-0 md:ml-auto w-full md:w-auto border-none outline-none px-12 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
