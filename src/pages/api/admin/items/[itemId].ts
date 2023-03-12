import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import Items from "../../../../models/foodItemModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const { itemId } = req.query;

    const itemById = await Items.findById(itemId).exec();

    res.status(200).json({ success: true, data: itemById });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
