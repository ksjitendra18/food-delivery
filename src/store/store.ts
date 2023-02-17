import { configureStore } from "@reduxjs/toolkit";
import { imageUploadReducer } from "./fileUpload/fileUploadSlice";
export default configureStore({
  reducer: {
    imageUploadReducer,
  },
});
