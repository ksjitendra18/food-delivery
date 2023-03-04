import React from "react";
import { MdAdd, MdClear, MdRemove } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../store/cart/cartSlice";
import Item from "../../types/ItemType";

const CartItem = ({
  item,
  quantity = 0,
}: {
  item: Item;
  quantity?: number;
}) => {
  const dispatch = useDispatch();
  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity({ id }));
  };
  const handleRemove = (id: string) => {
    dispatch(removeItem({ id }));
  };
  return (
    <div>
      <div className="trendingcard bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
        <div className="mb-5 flex justify-center">
          <img
            src={`${item.itemImageUrl}`}
            alt=""
            className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
          />
        </div>
        <div className="text-area text-center">
          <h3 className="text-xl font-bold">{item.itemName}</h3>
          <h3 className="text-xl mt-3">₹{item.itemPrice}</h3>
          <h3 className="text-base mt-3">Quantity: {item.quantity}</h3>
          <div className="flex justify-center gap-3 items-center m-3">
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleIncreaseQuantity(item._id)}
            >
              <MdAdd />
            </div>
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleDecreaseQuantity(item._id)}
            >
              <MdRemove />
            </div>
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleRemove(item._id)}
            >
              <MdClear />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
