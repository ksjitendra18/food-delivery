import { useRouter } from "next/router";
import { useState } from "react";

import Head from "next/head";
import useSWR, { mutate } from "swr";
import Loading from "../../../components/ui/Loading";
import OrderData from "../../../types/OrderData";
export default function ManageOrdersAdmin() {
  const router = useRouter();
  const { orderId } = router.query;

  const [toggleChangeOrderStatus, setToggleChangeOrderStatus] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data,
    error,
    isLoading,
  }: { data: { data: OrderData }; error: any; isLoading: boolean } = useSWR(
    orderId ? `/api/order/myorders/orderdata/${orderId}` : null,
    fetcher
  );

  if (isLoading && !data) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="md:my-7 md:px-11  p-4">
      <Head>
        <title> Order Details</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Order Details</h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
          {data?.data.cartItems.map((item) => (
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
            <p className="text-[20px] font-bold mt-5">Amount Paid: </p>
            <p className="text-[20px] font-bold mt-5">
              {" "}
              ₹{data?.data.totalPrice}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          <div className="flex flex-col mx-3 text-white">
            <div className="flex flex-wrap  gap-3 items-center">
              <h3 className=" text-xl font-bold ">User Name:</h3>
              <p className="font-bold">{data?.data.userName || "User"}</p>
            </div>
            <div>
              <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
                <h3 className="font-bold text-xl">Order Status : </h3>{" "}
                <span
                  className={`px-5 py-2 rounded-full ${
                    data?.data.orderStatus === "Preparing" ? "bg-red-800" : ""
                  }
                  
                  ${
                    data?.data.orderStatus === "Delivering"
                      ? "bg-white text-orange-600"
                      : ""
                  }
                  
                  ${
                    data?.data.orderStatus === "Delivered" ? "bg-green-600" : ""
                  }  `}
                >
                  {data?.data.orderStatus}
                </span>
                <h3
                  className="font-bold cursor-pointer"
                  onClick={() => setToggleChangeOrderStatus((prev) => !prev)}
                >
                  Change Status
                </h3>
              </div>
              {toggleChangeOrderStatus && (
                <div className="flex">
                  <ChangeOrderStatus
                    currentStatus={data?.data.orderStatus}
                    userId={data?.data.userId}
                    orderId={data?.data._id}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">{data?.data.userAddress}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Order Id:</h3>
              <p className="font-bold">{data?.data._id}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Razorpay Order Id:</h3>
              <p className="font-bold">{data?.data.razorpayOrderId}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Razorpay Payment Id:</h3>
              <p className="font-bold">{data?.data.razorpayPaymentId}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">User Id:</h3>
              <p className="font-bold">{data?.data.userId}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ChangeOrderStatus = ({
  currentStatus,
  userId,
  orderId,
}: {
  currentStatus: string;
  userId: string;
  orderId: string;
}) => {
  console.log(currentStatus);
  const router = useRouter();

  const changeStatus = async (status: string) => {
    // change the status
    console.log("status is ", status);

    await fetch(`/api/admin/orders/${orderId}`, {
      method: "POST",
      body: status,
    });

    mutate(`/api/order/myorders/orderdata/${orderId}`);
  };

  return (
    <div className="flex gap-5 flex-wrap mt-5">
      <button
        className={` ${
          currentStatus == "Preparing" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Preparing")}
      >
        Preparing
      </button>
      <button
        className={` ${
          currentStatus == "Delivering" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivering")}
      >
        Delivering
      </button>
      <button
        className={` ${
          currentStatus == "Delivered" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivered")}
      >
        Delivered
      </button>
    </div>
  );
};
