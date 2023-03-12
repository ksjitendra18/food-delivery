import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Item from "../../../../types/ItemType";
import useSWR from "swr";
import Loading from "../../../../components/ui/Loading";
import FormError from "../../../../components/ui/formError";
import { AdminAddItemsInputs } from "../add";
import Container from "../../../../components/mainContainer/container";
import { Id, toast } from "react-toastify";

interface EditedItemType {
  itemPrice: number;
  itemRating: number;
  itemIsAvailable: boolean;
  itemIsFeatured: boolean;
  itemName: string;
  itemCategory: string;
  __v?: Number | undefined;
  _id?: string;
  itemImageUrl?: string;
  itemImageId?: string;
  quantity?: number | undefined;
}
export default function EditItemAdmin() {
  const router = useRouter();

  // react toastify
  let updateItemToast: Id;

  const { itemId } = router.query;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminAddItemsInputs>();

  // fetching exisiting item value and providing as default values

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data,
    error,
    isLoading,
  }: { data: { data: Item }; error: any; isLoading: boolean } = useSWR(
    itemId ? `/api/admin/items/${itemId}` : null,
    fetcher
  );

  const formData: Item = data?.data;

  const onEditItems: SubmitHandler<AdminAddItemsInputs> = async (data) => {
    updateItemToast = toast.loading("Updating Data...");

    const itemPrice = +data.itemPrice!;
    const itemRating = +data.itemRating;
    const IsAvailable = data.itemIsAvailable === "yes" ? true : false;
    const IsFeatured = data.itemIsFeatured === "yes" ? true : false;
    let editedItem: EditedItemType = {
      ...formData,
      ...data,
      itemPrice: itemPrice,
      itemRating: itemRating,
      itemIsAvailable: IsAvailable,
      itemIsFeatured: IsFeatured,
    };
    console.log("submit data", editedItem);

    // these field are not to be sent
    delete editedItem["__v"];
    delete editedItem["_id"];
    delete editedItem["itemImageId"];
    delete editedItem["itemImageUrl"];

    try {
      await fetch(`/api/admin/items/edit/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedItem),
      });

      toast.update(updateItemToast, {
        render: "Update Success",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      router.push("/");
    } catch (e: any) {
      toast.update(updateItemToast, {
        render: "Upload Failed",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });

      console.log("error from update item.");
    }
  };

  let availableSelectValue = "yes";
  let featuredSelectValue = "no";

  if (isLoading && !formData) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (formData !== null) {
    availableSelectValue = formData?.itemIsAvailable === true ? "yes" : "no";
    featuredSelectValue = formData?.itemIsFeatured === true ? "yes" : "no";
  }
  return (
    <>
      <Head>
        <title>Edit Item | Admin</title>
      </Head>

      <Container as="section">
        <div className="bg-primary rounded-xl text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="px-5 md:px-10 py-5">
            <form
              onSubmit={handleSubmit(onEditItems)}
              className="text-white flex flex-col gap-4 "
            >
              <div>
                <label htmlFor="itemName">Item Name</label>
                <input
                  id="itemName"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("itemName", { required: true })}
                  defaultValue={formData?.itemName}
                  onChange={() => {}}
                />
              </div>
              <div>
                <label htmlFor="itemPrice">Item Price</label>
                <input
                  id="itemPrice"
                  type="number"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("itemPrice", { required: true, min: 0 })}
                  min={0}
                  defaultValue={formData?.itemPrice}
                  onChange={() => {}}
                />
              </div>

              <FormError
                errors={errors}
                errorEmitter={"itemPrice"}
                errorType={"required"}
                errorMessage={"This field is required"}
              />
              <FormError
                errors={errors}
                errorEmitter={"itemPrice"}
                errorType={"min"}
                errorMessage={" Price should be greater than 0"}
              />

              <div>
                <label htmlFor="itemRating">Item Rating</label>
                <input
                  id="itemRating"
                  type="number"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  {...register("itemRating", {
                    required: true,
                    min: 0,
                    max: 5,
                  })}
                  min={0}
                  defaultValue={formData?.itemRating}
                />
                <FormError
                  className="mt-3"
                  errors={errors}
                  errorEmitter={"itemRating"}
                  errorType={"max"}
                  errorMessage={" Rating should be between 0 and 5"}
                />
              </div>

              <div>
                <label htmlFor="itemCategory">Category</label>

                <select
                  {...register("itemCategory")}
                  id="category"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  defaultValue={formData?.itemCategory}
                >
                  <option value="uncategorised">Choose a category</option>
                  <option value="veg">Veg Dishes</option>
                  <option value="fastfood">Fast Food </option>
                  <option value="nonveg">Non Veg Dishes</option>
                  <option value="icecream">Icecream</option>
                  <option value="colddrinks">Cold Drinks</option>
                </select>
              </div>

              <div>
                <label htmlFor="isAvailable">Item Available</label>

                <select
                  {...register("itemIsAvailable")}
                  id="is_available"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  defaultValue={availableSelectValue}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="isFeatured">Featured Item</label>

                <select
                  {...register("itemIsFeatured")}
                  id="is_featured"
                  className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  defaultValue={featuredSelectValue}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="flex justify-end mt-5">
                <button
                  className=" text-white text-xl font-bold px-7 py-2 border-solid border-2 border-white rounded-full"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
