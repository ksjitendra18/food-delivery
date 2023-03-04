import Link from "next/link";
import React, { Key, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Item from "../../types/ItemType";
// import { addToCart } from "../store/cartSlice";
import useSWR from "swr";
import Loading from "../ui/Loading";
import ItemCard from "./itemCard";
interface CategorySectionProps {
  category: string;
  title: string;
  btnText: string;
}

const CategorySection = ({
  category,
  title,
  btnText,
}: CategorySectionProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/item/category/${category}`,
    fetcher
  );

  return (
    <div>
      <div className="flex gap-5 items-center">
        <h2 className="text-xl md:text-2xl  text-primary font-bold">{title}</h2>
        <button className="text-white text-sm  bg-primary font-bold px-5 py-2 rounded-full">
          <Link href={`/order/category/${category}`}> {btnText}</Link>
        </button>
      </div>

      <div className="flex items-center  flex-col md:flex-row gap-10 mt-20 mb-16">
        {data &&
          data.data.map((item: Item) => (
            <ItemCard key={item._id as Key} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CategorySection;
