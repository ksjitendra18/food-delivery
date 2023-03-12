import useSWR from "swr";
import Item from "../../types/ItemType";
import Loading from "../ui/Loading";
import AdminItemsCard from "./adminItemsCard";
export default function AdminItems() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/admin/items", fetcher);

  if (isLoading) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-10">
      {data?.data.map((item: Item) => (
        <AdminItemsCard key={item._id} item={item} />
      ))}
    </div>
  );
}
