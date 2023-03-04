import { useUser } from "@auth0/nextjs-auth0/client";
import { nanoid } from "@reduxjs/toolkit";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../../types/ItemType";

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cartReducer.cart);

  const user = useUser();

  const [items, setItems] = useState([]);
  const [cartItemId, setCartItemId] = useState<string[]>([]);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item: Item) => {
      totalQuantity += item.quantity!;
      totalPrice += item.itemPrice! * item.quantity!;
    });
    return { totalPrice, totalQuantity };
  };

  const getItemId = () => {
    let itemIdArr: string[] = [];
    cartItems.forEach((item: Item) => {
      itemIdArr.push(item._id);
    });

    return itemIdArr;
  };

  const price = getTotal().totalPrice;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setItems(cartItems);
    setTotal(getTotal().totalPrice);
    setCartItemId(getItemId());
  }, [cartItems]);

  const onAddShipping = async (data: any) => {
    console.log(data);

    const orderData = {
      user_id: user.user!.sid,
      //   userName: userInfo.name,
      address: data.address,
      phoneno: +data.phoneno,
      totalprice: total,
      itemid: cartItemId,
      cartItems: cartItems,
      orderStatus: "Preparing",
      orderedTime: new Date().toISOString(),
    };
    console.log(orderData);

    const id = nanoid();
  };
  console.log("user is", user);

  return (
    <section className="md:my-7 md:px-11  p-4">
      <Head>
        <title>Checkout</title>
      </Head>
      <h2 className="text-primary text-4xl font-bold mb-10">
        Your order summary
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
          {items.map((item: Item) => (
            <div
              key={item._id}
              className="card rounded-lg flex justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]"
            >
              <p className="font-bold">
                {item.quantity} x {item.itemName}
              </p>

              <p className="font-bold">₹{+item.quantity! * +item.itemPrice!}</p>
            </div>
          ))}

          <div className="flex justify-between">
            <p className="text-[20px] font-bold mt-5">Total: </p>
            <p className="text-[20px] font-bold mt-5"> ₹{total}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          {user.user !== undefined ? (
            <div className="my-5 flex flex-col mx-3 text-white">
              {/* <h3 className="font-bold text-xl mb-5">Name: {userInfo.name}</h3> */}
              <h3 className="font-bold text-xl mb-5">Name</h3>

              <form onSubmit={handleSubmit(onAddShipping)}>
                <div className="mb-6">
                  <label
                    htmlFor="itemname"
                    className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    id="itemname"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="itemname"
                    className="block mb-2 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("phoneno")}
                    id="itemname"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className=" px-8 py-3 border-solid border-3 border-white rounded-full"
                >
                  {/* <Link href="/order/success">Proceed to pay</Link> */}
                  Proceed to pay
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full justify-center text-white items-center px-3 py-5 min-h-[200px]">
              <h3 className="font-bold text-2xl mb-5">Login or Signup first</h3>
              <div className="flex gap-5">
                <button className="px-6 py-1 border-solid border-3 border-white rounded-full">
                  <Link href="/login">Login</Link>
                </button>
                <button className="px-6 py-1 border-solid border-3 border-white rounded-full">
                  <Link href="/signup">Signup</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
