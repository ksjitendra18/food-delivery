import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

// const Razorpay = require("razorpay");

import Razorpay from "razorpay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const { totalPrice } = req.body;

    const payment_capture = 1;
    const amount = totalPrice;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: nanoid(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
