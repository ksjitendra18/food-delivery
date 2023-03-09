import { useUser } from "@auth0/nextjs-auth0/client";
import { nanoid } from "@reduxjs/toolkit";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/ui/Loading";
import Item from "../../../types/ItemType";
import { clearCart } from "../../../store/cart/cartSlice";
import getTotal from "../../../utils/calculateTotal";
import { RootState } from "../../../store/store";
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  userId: unknown;
  userEmail: string | null | undefined;
  userName: any;
  userAddress: any;
  userPhoneNo: number;
  totalPrice: number;
  itemId: string[];
  cartItems: Item[];
  orderStatus: string;
  orderedTime: string;
}
export default function CheckoutPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);

  const user = useUser();

  const [items, setItems] = useState<Item[]>([]);
  const [cartItemId, setCartItemId] = useState<string[]>([]);

  const getItemId = () => {
    let itemIdArr: string[] = [];
    cartItems.forEach((item: Item) => {
      itemIdArr.push(item._id);
    });

    return itemIdArr;
  };

  const [total, setTotal] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    setItems(cartItems);
    setTotal(getTotal(cartItems).totalPrice);
    setCartItemId(getItemId());
  }, [cartItems]);

  const onAddShipping = async (data: any) => {
    console.log(data);
    setButtonLoading(true);
    const orderData = {
      userId: user.user!.sid,
      userEmail: user.user!.email,
      userName: data.username,
      userAddress: data.useraddress,
      userPhoneNo: +data.userphoneno,
      totalPrice: total,
      itemId: cartItemId,
      cartItems: cartItems,
      orderStatus: "Preparing",
      orderedTime: new Date().toISOString(),
    };
    // console.log(orderData);

    makePayment(orderData);

    const id = nanoid();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (paymentData: PaymentData) => {
    console.log("here...", paymentData);
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    console.log("above payment data", paymentData.totalPrice);
    const paymentdata: any = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ totalPrice: paymentData.totalPrice }),
    }).then((t) => t.json());

    console.log("paymentdata is", paymentdata);

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Food Express",
      currency: paymentdata.currency,
      amount: +paymentdata.amount,
      order_id: paymentdata.id,
      description: "Thankyou for your payment. We are preparing your order.",

      handler: async function (response: any) {
        try {
          const res = await fetch("/api/order/orderdata", {
            method: "POST",
            body: JSON.stringify({
              ...paymentData,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          });

          const resdata = await res.json();

          console.log("resdata is", resdata);
        } catch (error: any) {
          throw new Error(error, error.message);
        }
        setButtonLoading(false);
        dispatch(clearCart());
        router.push("/order/success");
      },
      prefill: {
        name: paymentData.userName,
        email: paymentData.userEmail,
        contact: paymentData.userPhoneNo,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
              {/* <h3 className="font-bold text-xl mb-5">Name</h3> */}

              <form onSubmit={handleSubmit(onAddShipping)}>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("username")}
                    id="username"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="useraddress"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Address
                  </label>
                  <input
                    type="text"
                    {...register("useraddress")}
                    id="useraddress"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="userphoneno"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("userphoneno")}
                    id="userphoneno"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                {/* <button
                  type="submit"
                  className=" px-8 py-3 border-solid border-3 border-white rounded-full"
                >
                  Proceed to pay
                </button> */}
                {!buttonLoading ? (
                  <button
                    type="submit"
                    className=" px-8 py-3 border-solid border-3 border-white rounded-full"
                  >
                    {/* <Link href="/order/success">Proceed to pay</Link> */}
                    Proceed to pay
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className=" cursor-wait px-8 py-3 border-solid border-3 border-white rounded-full gap-2 flex items-center"
                  >
                    <Loading color="white" />
                    Processing...
                  </button>
                )}
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
