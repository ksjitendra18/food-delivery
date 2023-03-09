import mongoose from "mongoose";
import { NewItemSchema } from "./foodItemModel";

const OrderedItemSchema = new mongoose.Schema({
  userId: String,

  userName: String,

  userAddress: String,

  userEmail: String,

  userPhoneNo: {
    type: Number,
    required: true,
  },

  itemId: [String],

  totalPrice: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    required: true,
  },

  orderedTime: {
    type: String,
    required: true,
  },

  cartItems: [NewItemSchema],

  razorpayPaymentId: String,

  razorpayOrderId: String,
});

export default mongoose.models.Orders ||
  mongoose.model("Orders", OrderedItemSchema);
