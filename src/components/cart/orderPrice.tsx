import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../store/cart/cartSlice";
import Item from "../../types/ItemType";

const OrderPrice = () => {
  const cartItem = useSelector((state: any) => state.cartReducer.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItem.forEach((item: Item) => {
      totalQuantity += item.quantity!;
      totalPrice += item.itemPrice! * item.quantity!;
    });
    return { totalPrice, totalQuantity };
  };

  // const [quantity, setQuantity] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   setQuantity(getTotal().totalQuantity);
  //   setPrice(getTotal().totalPrice);
  // }, [cartItem]);

  const quantity = getTotal().totalQuantity;
  const price = getTotal().totalPrice;
  // setTotalPrice(price)

  return (
    <div className="pt-5 pb-10 px-3">
      <h2 className="font-bold text-center text-2xl mb-5">Order Value</h2>

      <h3 className="text-xl text-center  ">
        Total Quantity: <span className="font-bold"> {quantity}</span>
      </h3>
      <h3 className="text-xl text-center mt-5  ">
        Total Price: <span className="font-bold"> ₹{price}</span>
      </h3>

      <div className="flex justify-center mt-7">
        <button className="text-xl font-bold border-solid border-3 border-white text-white rounded-full px-7 py-2">
          <Link href="/order/checkout">Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderPrice;
