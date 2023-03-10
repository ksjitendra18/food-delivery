import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/dbConnect";
import Orders from "../../../../models/orderedItemModel";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { orderId } = req.query;

  const orders = await Orders.findById(orderId);
  const update = { orderStatus: req.body };
  await orders.updateOne(update);

  res.status(201).json({ success: true });
}
