import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Item from "../../types/ItemType";
import getTotal from "../../utils/calculateTotal";

const OrderPrice = () => {
  const cartItem = useSelector((state: RootState) => state.cartReducer.cart);

  const quantity = getTotal(cartItem).totalQuantity;
  const price = getTotal(cartItem).totalPrice;

  return (
    <div className="pt-5 pb-10 px-3">
      <h2 className="font-bold text-center text-2xl mb-5">Order Value</h2>

      <h3 className="text-xl text-center  ">
        Total Quantity: <span className="font-bold"> {quantity}</span>
      </h3>
      <h3 className="text-xl text-center mt-5  ">
        Total Price: <span className="font-bold"> ₹{price}</span>
      </h3>

      <div className="flex justify-center mt-7">
        <button className="text-xl font-bold border-solid border-3 border-white text-white rounded-full px-7 py-2">
          <Link href="/order/checkout">Checkout</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderPrice;
