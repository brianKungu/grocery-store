import Head from "next/head";
import { React, useState } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import data from "../utils/data";
import Loader from "../components/Loader";
import { AiOutlineCloudUpload, AiFillDelete } from "react-icons/ai";
import PrimaryButton from "../components/PrimaryButton";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
export default function CreateContainer() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alert, setAlert] = useState("danger");
  const [isLoading, setisLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  const uploadImage = (e) => {
    setisLoading(true);
    // capture the image from the input
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uplaoding: Try again!");
        setAlert("danger");
        setTimeout(() => {
          setFields(false);
          setisLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setisLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully!");
          setAlert("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setisLoading(false);
      setFields(true);
      setMsg("Image deleted successfully!");
      setAlert("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setisLoading(true);
    try {
      if (!title || !imageAsset || !category || !price) {
        setFields(true);
        setMsg("Kindly input all the required fields!");
        setAlert("danger");
        setTimeout(() => {
          setFields(false);
          setisLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          quantity: 1,
          price: price,
        };
        saveItem(data);
        setisLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully!");
        setAlert("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: Try again!");
      setAlert("danger");
      setTimeout(() => {
        setFields(false);
        setisLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCategory("Select Category");
    setPrice("");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <Layout>
      <Head>
        <title>Create Item</title>
      </Head>
      <div className="flex items-center justify-center w-full min-h-screen">
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
          <div className="flex items-center w-full gap-2 py-2 border-b border-green-300">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Provide a product title"
              className="flex-1 w-full h-full p-2 text-lg font-semibold text-green-800 bg-transparent border-none outline-none placeholder:text-green-800"
            />
            <label className="text-sm text-green-800">Product title</label>
          </div>

          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 text-base font-semibold bg-transparent border border-green-300 rounded-md outline-none hover:text-green-800 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300"
            >
              <option value="other" className="font-semibold">
                Select Category
              </option>
              {data.categories &&
                data.categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.urlParamName}
                    className="font-semibold border-none outline-none bg-inherit"
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col items-center justify-center w-full border-2 border-green-300 border-dotted rounded-md cursor-pointer dottedContainer group">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <AiOutlineCloudUpload className="text-3xl text-green-800 hover:text-green-500" />
                        <p className="text-green-800 hover:text-green-500">
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="h-0 w-o"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative h-full">
                      <img
                        src={imageAsset}
                        alt="uploaded image"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        className="absolute p-3 text-xl transition-all duration-500 ease-in-out bg-red-300 rounded-full shadow-md cursor-pointer bottom-3 right-3 hover:bg-red-900 outiline-none"
                        onClick={deleteImage}
                      >
                        <AiFillDelete className="text-red-800 hover:text-red-300" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex items-center w-full gap-2 py-2 border-b border-green-300">
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Provide a product price"
              className="flex-1 w-full h-full p-2 text-lg font-semibold text-green-800 bg-transparent border-none outline-none placeholder:text-green-800"
            />
            <label className="text-sm text-green-800">Product price</label>
          </div>
          <div className="flex items-center w-full">
            <button
              type="button"
              className="w-full px-12 py-2 ml-0 text-lg font-semibold text-white border-none rounded-lg outline-none bg-emerald-500 md:ml-auto md:w-auto"
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
