import Item from "../../types/ItemType";

export default function SingleOrderData({
  items,
  total,
}: {
  items: Item[];
  total: number;
}) {
  return (
    <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
      {items &&
        items.map((item: Item) => (
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
  );
}
