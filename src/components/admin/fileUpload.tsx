import { IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Id, toast } from "react-toastify";
import Loading from "../UI/Loading";
import {
  deleteUploadedImage,
  setUploadedImageId,
  setUploadedImageUrl,
} from "../../store/fileUpload/fileUploadSlice";
import imagekit from "../../utils/imageKitConfig";

const FileUpload = () => {
  const inputRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let uploadToast: Id;
  const onError = (err: any) => {
    console.log("Error", err);
    setLoading(false);
    toast.update(uploadToast, {
      render: "Upload Failed",
      type: "error",
      isLoading: false,
      autoClose: 1500,
    });
  };
  const onSuccess = (res: any) => {
    dispatch(setUploadedImageId(res.fileId));

    dispatch(setUploadedImageUrl(res.url));
    setLoading(false);
    toast.update(uploadToast, {
      render: "Upload Success",
      type: "success",
      isLoading: false,
      autoClose: 1500,
    });
    setImageUrl(res.url);
  };

  const onUploadStart = (evt: any) => {
    setImageUrl(null);
    setLoading(true);

    uploadToast = toast.loading("Uploading Image...");
  };

  const fileId = useSelector(
    (state: any) => state.imageUploadReducer?.uploadedImageId
  );
  const handleDeleteImage = async () => {
    console.log("fileId", fileId);
    imagekit.options.urlEndpoint = "http://localhost:3000/api/ikauth";
    imagekit.deleteFile(fileId);
    imagekit.url;
    dispatch(deleteUploadedImage());
  };

  if (loading) {
    return (
      <div className="h-[250px] md:h-[400px] border-dotted border-2 rounded-lg mt-2 flex items-center justify-center ">
        <Loading w={8} /> <p className="ml-2 text-xl"> Uploading...</p>
      </div>
    );
  }

  return (
    <div className="h-[250px] md:h-[400px] border-dotted border-2 rounded-lg mt-2 flex items-center justify-center ">
      {imageUrl === null ? (
        <label className="w-full h-full flex items-center justify-center cursor-pointer">
          <MdCloudUpload className="text-2xl  mr-2" />

          <IKUpload
            inputRef={inputRef}
            className="w-0 h-0"
            required
            onError={onError}
            onSuccess={onSuccess}
            // onUploadProgress={onUploadProgress}
            onUploadStart={onUploadStart}
          />

          <button type="button" onClick={() => inputRef.current.click()}>
            Upload Image
          </button>
        </label>
      ) : (
        <div className="flex flex-col gap-5">
          <img src={imageUrl!} width="300" />

          {/* <button
            className="bg-red-800 text-white rounded-lg px-5 py-2"
            type="button"
            onClick={() => handleDeleteImage()}
          >
            Delete Image
          </button> */}
        </div>
        // <img src={imageUrl!} width="100" height="100" />
      )}
    </div>
  );
};

export default FileUpload;
