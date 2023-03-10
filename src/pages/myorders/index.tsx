import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import OrderCard from "../../components/orders/orderCard";
import Loading from "../../components/ui/Loading";
import OrderData from "../../types/OrderData";
export default function MyOrders() {
  const user = useUser();
  const userId = user.user?.sub;

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

  console.log("orderdata,", data);
  return (
    <section className="md:my-7 md:px-11 p-4">
      <Head>
        <title>My Orders</title>
      </Head>
      <h2 className="text-primary text-3xl font-bold mb-10">Your Orders</h2>
      <div className="card ">
        {data.data.length > 0 ? (
          data.data.map((order: OrderData) => (
            <OrderCard order={order} key={order._id} admin={false} />
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
