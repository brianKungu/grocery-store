import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function Hero() {
  return (
    <div className="w-full">
      <div
        className="h-screen object-center bg-cover bg-no-repeay bg-center"
        style={{
          backgroundPosition: "50%",
          backgroundImage: "url('/images/heroImage.jpg')",
          height: "500px",
        }}
      >
        <div
          className="w-full h-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="mx-auto mt-20 max-w-7xl px-4 py-10 md:mt-20 xl:mt-28">
            <div className="flex flex-col justify-center text-center md:text-left">
              <div className="tracking-tight text-center md:text-left text-white font-bold space-y-4">
                <h1 className="md:text-6xl text-5xl">
                  Welcome to Deli Grocery
                </h1>
                <h3 className="text-4xl md:font-semibold font-light">
                  Save time and leave the groceries to us.
                </h3>
              </div>
              <div className="mt-8">
                <PrimaryButton text="Shop now" />
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

