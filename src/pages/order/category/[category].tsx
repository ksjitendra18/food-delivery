import { useRouter } from "next/router";
import { Key, useEffect, useState } from "react";

import Item from "../../../types/ItemType";
import useSWR from "swr";
import ItemCard from "../../../components/items/itemCard";
const SingleCategoryItems = () => {
  const [title, setTitle] = useState<string | null>(null);

  const router = useRouter();
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

  console.log("category", category);

  const btnText = "Click";

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const fetcher = () =>
    fetch(`/api/item/category/${category}`).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/item/singlecategory/${category}`,
    fetcher
  );

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
