import Head from "next/head";
import Image from "next/image";
import { Footer, Header, Hero, ProductsSection } from "../components";
import styles from "../styles/Home.module.css";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <AnimatePresence exitBeforeEnter>
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
