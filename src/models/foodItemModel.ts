import mongoose from "mongoose";

// this is also used in orderedItemModel and cartInfoModel
export const NewItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemRating: {
    type: Number,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemIsAvailable: {
    type: Boolean,
    default: true,
  },
  itemIsFeatured: {
    type: Boolean,
    default: false,
  },
  itemImageId: {
    type: String,
    required: true,
  },
  itemImageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.models.Items || mongoose.model("Items", NewItemSchema);
