import { configureStore } from "@reduxjs/toolkit";
import { imageUploadReducer } from "./fileUpload/fileUploadSlice";
import { cartReducer } from "./cart/cartSlice";
export default configureStore({
  reducer: {
    imageUploadReducer,
    cartReducer,
  },
});
