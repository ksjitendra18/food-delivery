import React from "react";
import Item from "../../types/ItemType";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
interface ItemCardProps {
  item: Item;
}
const ItemCard = ({ item }: ItemCardProps) => {
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
  return (
    <div className="trendingcard   bg-white px-4 py-2 text-black  rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
      <div className="mb-5 flex justify-center">
        <img
          src={`${item.itemImageUrl}`}
          alt=""
          className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
        />
        {/* 230px */}
      </div>
      <div className="text-area text-center">
        <h3 className="text-xl font-bold">{item.itemName}</h3>
        <h3 className="text-xl mt-3">₹{item.itemPrice}</h3>
        <div className="flex justify-end items-center mt-3">
          <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleAddToCart(item)}
          >
            <MdAddShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
