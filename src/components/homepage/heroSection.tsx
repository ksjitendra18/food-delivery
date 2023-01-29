import Image from "next/image";
import React from "react";
import Container from "../MainContainer/container";

const HeroSection = () => {
  const imageStyle = {
    height: "540px",
  };
  return (
    <section className="bg-primary text-white md:min-h-[400px] flex justify-between md:flex-row flex-col-reverse py-8 md:pl-11 md:px-0 px-4">
      <div className="left-area mt-10 md:mt-32 flex-1">
        <h2 className="md:text-[70px] text-[50px] font-bold leading-[50px] md:leading-[70px]">
          Fresh Food <br /> Delivered FAST{" "}
        </h2>
        <p className=" mt-5 ">
          Order your favorite food online with a tap of a button.{" "}
        </p>

        <button className=" bg-white text-primary font-bold px-8 py-2 rounded-lg mt-4 ">
          Order Now
        </button>
      </div>

      <div className="right-area flex justify-end flex-1">
        <Image
          src="/pizza-hero.png"
          height={540}
          width={317}
          alt=""
          className="hidden md:block  "
          //   className="hidden md:block md:h-[540px] "
        />
      </div>
    </section>
  );
};

export default HeroSection;
