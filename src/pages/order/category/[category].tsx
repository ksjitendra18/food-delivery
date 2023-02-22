import { useRouter } from "next/router";
import React, { Key, useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Item from "../../../types/ItemType";
import useSWR from "swr";
import ItemCard from "../../../components/items/itemCard";
const SingleCategoryItems = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState<string | null>(null);

  const router = useRouter();

  //   { category, title, btnText }
  const { category } = router.query;

  console.log(category);

  useEffect(() => {
    if (category === "veg") {
      setTitle("Veg");
    }

    category === "nonveg" ? setTitle("Non Veg") : "";
    category === "fastfood" ? setTitle("Fast Food") : "";
    category === "icecream" ? setTitle("Icecream") : "";
    category === "colddrinks" ? setTitle("Cold Drink") : "";
  }, [category]);

  const btnText = "Click";
  // const fetchData = async () => {
  //   const res = await fetch(`${URL}/itemsbycategory/?keyword=${category}`);

  //   const data = await res.json();

  //   setItems(data.items);
  // };

  // useEffect(() => {
  //   if (category !== undefined) {
  //     fetchData();
  //   }
  // }, [category]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/item/category/${category}`,
    fetcher
  );
  const dispatch = useDispatch();
  const showToastMessage = () => {
    toast.success("Item Added to Cart", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddToCart = (item: Item) => {
    console.log(item);
    // dispatch(addToCart(item));
    showToastMessage();
  };

  console.log(items);
  return (
    <section className="md:my-7 lg:px-28 md:px-18  p-4">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl  text-primary font-bold">All {title} items</h2>
      </div>

      <div className="flex items-center  flex-col md:flex-row gap-10 mt-20 mb-16">
        {data &&
          data.data.map((item: Item) => (
            <ItemCard key={item._id as Key} item={item} />
          ))}
      </div>
    </section>
  );
};

export default SingleCategoryItems;
