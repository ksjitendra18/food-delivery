import { createSlice } from "@reduxjs/toolkit";

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState: {
    uploadedImageId: null,
    uploadedImageUrl: null,
  },

  reducers: {
    setUploadedImageId: (state, action) => {
      console.log(
        "setUploadedImageId called with:",
        action.payload,
        typeof action.payload
      );
      state.uploadedImageId = action.payload;
    },
    setUploadedImageUrl: (state, action) => {
      console.log(
        "setUploadedImageUrl called with:",
        action.payload,
        typeof action.payload
      );
      state.uploadedImageUrl = action.payload;
    },
    deleteUploadedImage: (state) => {
      state.uploadedImageId = null;
      state.uploadedImageUrl = null;
    },
  },
});

export const imageUploadReducer = imageUploadSlice.reducer;

export const { setUploadedImageId, setUploadedImageUrl, deleteUploadedImage } =
  imageUploadSlice.actions;
