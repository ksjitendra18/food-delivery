import { configureStore } from "@reduxjs/toolkit";
import { imageUploadReducer } from "./fileUpload/fileUploadSlice";
import { cartReducer } from "./cart/cartSlice";
const store = configureStore({
  reducer: {
    imageUploadReducer,
    cartReducer,
  },
});
// export default configureStore({
//   reducer: {
//     imageUploadReducer,
//     cartReducer,
//   },
// });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
