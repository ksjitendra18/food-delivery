import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Item from "../../types/ItemType";
import OrderData from "../../types/OrderData";
import useSWR from "swr";
import Loading from "../../components/ui/Loading";
export default function MyOrders() {
  const user = useUser();
  const userId = user.user?.sid;

  const fetcher = () =>
    fetch(`/api/order/myorders/${userId}`).then((res) => res.json());

  const {
    data,
    error,
    isLoading,
  }: { data: { data: OrderData[] }; error: any; isLoading: boolean } = useSWR(
    `/api/order/myorders/${userId}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="md:my-7 md:px-11 p-4">
      <Head>
        <title>My Orders</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Your Orders</h2>
      <div className="card ">
        {data.data.length > 0 ? (
          data.data.map((orders: OrderData) => (
            <div className="card mb-7" key={orders._id}>
              <Link href={`/myorders/${orders._id}`}>
                <div className="card cursor-pointer rounded-lg flex flex-col md:flex-row justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]">
                  <p>
                    <span className="font-bold">Order Id:</span> {orders._id}
                  </p>
                  {/* <p>Amount: {orders.totalprice}</p> */}
                  <p>
                    <span className="font-bold">Order Status:</span>{" "}
                    <span
                      className={`${
                        orders.orderStatus === "Preparing" ? "text-red-800" : ""
                      }
                      
                       
                      ${
                        orders.orderStatus === "Delivering"
                          ? "text-orange-600"
                          : ""
                      }
                      
                      ${
                        orders.orderStatus === "Delivered"
                          ? "text-green-600"
                          : ""
                      } 
                    
                      font-semibold`}
                    >
                      {orders.orderStatus}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <h2>You have not made any order yet. Order Now!!</h2>

            <button className="py-3 px-8 mt-5 bg-primary text-white rounded-full">
              <Link href="/order">Order Now</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
