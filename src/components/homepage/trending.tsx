import Link from "next/link";
import { Key } from "react";
import useSWR from "swr";

import Loading from "../ui/Loading";
import Item from "../../types/ItemType";
import ItemCard from "../items/itemCard";

const Trending = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/item/featured", fetcher);

  return (
    <section className="page-section lg:px-28 md:px-18 md:py-10 p-4 bg-primary md:rounded-none rounded-xl">
      <h2 className="text-center text-3xl md:text-[50px] text-white font-bold">
        Trending
      </h2>
      <div className="flex justify-center flex-wrap items-center flex-col md:flex-row gap-10 mt-20">
        {!isLoading ? (
          data.data.map((item: Item) => (
            <ItemCard key={item._id as Key} item={item} />
          ))
        ) : (
          <Loading color="white" />
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
        <button className="text-xl font-bold border-solid border-4 border-white text-white rounded-lg px-9 py-4">
          <Link href="/order">View All Items</Link>
        </button>
      </div>
    </section>
  );
};

export default Trending;
