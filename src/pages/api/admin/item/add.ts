import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Items from "../../../../models/foodItemModel";
export default async function handler(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const data = JSON.parse(req.body);
  console.log("todoData", data);
  const itemDetails = await Items.create(data);
  res.status(201).json({ success: true, data: itemDetails });
  //   try {
  //     const todo = await Todo.create({ todo: todoData });
  //     res.status(200).json({ success: true, data: todo });
  //   } catch (e: any) {
  //     res.status(400).json({ success: false });
  //   }
}
