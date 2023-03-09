import Item from "./ItemType";

export default interface OrderData {
  __v?: Number;
  _id: string;
  cartItems: Item[];
  itemId: string[];
  orderStatus: "Preparing" | "Delivering" | "Delivered";
  orderedTime: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  totalPrice: number;
  razorpayOuserAddressrderId: string;
  userEmail: string;
  userId: string;
  userName: string;
  userAddress: string;
  totuserPhoneNoalPrice: number;
}
