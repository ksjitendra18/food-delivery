import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";

import Loading from "../../components/ui/Loading";
import SingleOrderData from "../../components/orders/singleOrderData";

import OrderData from "../../types/OrderData";

export default function OrderDataPage() {
  const router = useRouter();

  const { orderId } = router.query;

  console.log(orderId);

  const fetcher = () =>
    fetch(`/api/order/myorders/orderdata/${orderId}`).then((res) => res.json());

  const {
    data,
    error,
    isLoading,
  }: { data: { data: OrderData }; error: any; isLoading: boolean } = useSWR(
    `/api/order/myorders/orderdata/${orderId}`,
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
    <section className="md:my-7 md:px-11  p-4">
      <Head>
        <title> Order Details</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">
        Your Order Details
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <SingleOrderData
          items={data.data.cartItems}
          total={data.data.totalPrice}
        />

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          <div className="my-5 flex flex-col mx-3 text-white">
            <div className="flex gap-3 items-center">
              <h3 className="font-bold text-xl">Order Status : </h3>{" "}
              <span
                className={`px-5 py-2 rounded-full ${
                  data.data.orderStatus === "Preparing" ? "bg-red-600" : ""
                }
                   
                ${data.data.orderStatus === "Delivering" ? "bg-orange-600" : ""}
                
                ${
                  data.data.orderStatus === "Delivered" ? "bg-green-600" : ""
                }               
                `}
              >
                {data.data.orderStatus}
              </span>
            </div>
            <div className="mt-5 flex  gap-3 items-center">
              <h3 className=" text-xl font-bold ">Payment Id:</h3>
              <p className="font-bold">{data.data.razorpayPaymentId}</p>
            </div>
            <div className="flex mt-5 gap-3 items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">{data.data.userAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
