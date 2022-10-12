import Head from "next/head";
import Image from "next/image";
import { Footer, Header, Hero, ProductsSection } from "../components";
import styles from "../styles/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "../context/reducer";

export default function Home() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Hero />
      <ProductsSection />
      <Footer />
    </AnimatePresence>
  );
}
