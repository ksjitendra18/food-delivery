import Link from "next/link";
import React from "react";
import OrderData from "../../types/OrderData";

export default function OrderCard({
  order,
  admin,
}: {
  order: OrderData;
  admin?: boolean;
}) {
  return (
    <div className="card mb-7">
      <Link
        href={admin ? `/admin/orders/${order._id}` : `/myorders/${order._id}`}
      >
        <div className="card cursor-pointer rounded-lg flex flex-col md:flex-row justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]">
          <p>
            <span className="font-bold">Order Id:</span> {order._id}
          </p>
          <p>
            <span className="font-bold">Amount:</span> {order.totalPrice}
          </p>
          <p>
            <span className="font-bold">Order Status:</span>{" "}
            <span
              className={`${
                order.orderStatus === "Preparing" ? "text-red-800" : ""
              }
          
           
          ${order.orderStatus === "Delivering" ? "text-orange-600" : ""}
          
          ${order.orderStatus === "Delivered" ? "text-green-600" : ""} 
        
          font-semibold`}
            >
              {order.orderStatus}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
