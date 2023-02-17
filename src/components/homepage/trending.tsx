import Link from "next/link";
import React, { Key, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import TrendingCard from "./trendingCard";
import useSWR from "swr";
import Loading from "../UI/Loading";
import Item from "../../types/ItemType";
const Trending = () => {
  // const [featuredItems, setFeaturedItems] = useState([]);

  // const fetchFeaturedItems = async () => {
  //   const res = await fetch(`/api/item/featured`);
  //   const data = await res.json();
  //   console.log(data.data, "cool");
  //   setFeaturedItems(data.data);
  // };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/item/featured", fetcher);

  console.log("isLoading", isLoading);
  console.log("data", data?.data);

  // useEffect(() => {
  //   fetchFeaturedItems();
  // }, []);
  return (
    <section className="page-section lg:px-28 md:px-18 md:py-10 p-4 bg-primary md:rounded-none rounded-xl">
      <h2 className="text-center text-3xl md:text-[50px] text-white font-bold">
        Trending
      </h2>
      <div className="flex justify-center items-center flex-col md:flex-row gap-10 mt-20">
        {!isLoading ? (
          data.data.map((item: Item) => (
            <TrendingCard key={item._id as Key} item={item} />
          ))
        ) : (
          <Loading />
        )}
      </div>
      {/* <div className="flex justify-center items-center flex-col md:flex-row gap-10 mt-20">
        {featuredItems.length > 0
          ? featuredItems.map((item) => (
              <TrendingCard key={item._id} item={item} />
            ))
          : ""}
      </div> */}

      <div className="flex justify-center items-center mt-12">
        <button className="text-xl font-bold border-solid border-4 border-white text-white rounded-full px-9 py-4">
          <Link href="/order">View All Items</Link>
        </button>
      </div>
    </section>
  );
};

export default Trending;
