import React from "react";
import Item from "../../types/ItemType";

import { useRouter } from "next/router";

import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";

export default function AdminItemsCard({ item }: { item: Item }) {
  const router = useRouter();
  const handleEdit = (itemId: string) => {
    router.push(`/admin/edit/${itemId}`);
  };

  const handleDelete = async (itemId: string) => {
    await fetch(`/api/admin/items/delete/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    router.push("/admin/items");
  };
  return (
    <div className=" bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
      <div className="mb-5 flex  justify-center">
        <img
          src={`${item.itemImageUrl}`}
          alt=""
          className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
        />
      </div>
      <div className="text-area text-center">
        <h3 className="text-xl font-bold">{item.itemName}</h3>
        <h3 className="text-xl mt-3">₹{item.itemPrice}</h3>
        <div className="flex justify-center gap-4 items-center mt-5 mb-3">
          {/* <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleEdit(item._id)}
          > */}
          <Link
            href={`/admin/items/edit/${item._id}`}
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
          >
            <MdEdit />
          </Link>
          {/* </div> */}
          <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleDelete(item._id)}
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
