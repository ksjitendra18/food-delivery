export default interface Item {
  __v?: Number;
  _id: String;
  itemName: string;
  itemCategory: string;
  itemImageUrl: string;
  itemImageId: string;
  itemPrice?: number;
  itemRating: number;
  itemIsFeatured: boolean;
  itemIsAvailable: boolean;
}
