import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Items from "../../../models/foodItemModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const featuredItems = await Items.find({ itemIsFeatured: true }).exec();
    res.status(200).json({ success: true, data: featuredItems });
    // res.status(200).json(featuredItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
