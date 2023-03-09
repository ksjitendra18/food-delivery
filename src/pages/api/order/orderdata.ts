import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Orders from "../../../models/orderedItemModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const data = JSON.parse(req.body);
  console.log("orderData", data);
  const itemDetails = await Orders.create(data);
  res.status(201).json({ success: true, data: itemDetails });
}
