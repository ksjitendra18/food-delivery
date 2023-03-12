import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import OrderCard from "../../../components/orders/orderCard";
import Loading from "../../../components/ui/Loading";
import OrderData from "../../../types/OrderData";
export default function AllOrdersAdmin() {
  const user = useUser();
  const userId = user.user?.sub;

  const fetcher = () => fetch(`/api/admin/orders`).then((res) => res.json());

  const {
    data,
    error,
    isLoading,
  }: { data: { data: OrderData[] }; error: any; isLoading: boolean } = useSWR(
    `/api/admin/orders`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  console.log("orderdata,", data);
  return (
    <section className="md:my-7 md:px-11 p-4">
      <Head>
        <title>All Orders</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Your Orders</h2>
      <div className="card ">
        {data.data.length > 0 ? (
          data.data.map((order: OrderData) => (
            <OrderCard order={order} key={order._id} admin={true} />
          ))
        ) : (
          <div>
            <h2>There are no orders made till yet.</h2>
          </div>
        )}
      </div>
    </section>
  );
}
