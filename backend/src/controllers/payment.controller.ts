import razorpay from "@/libs/razorpay";
import type { Request, Response } from "express";
import crypto from "crypto";
import prisma from "@/libs/prisma";

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const order = await razorpay.orders.create({
      amount: 19900,
      currency: "INR",
    });

    return res.status(200).json({
      message: "Order created",
      order,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create order" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  try {
    if (signature === razorpay_signature) {
      await prisma.user.update({
        where: {
          id: req.userId,
        },
        data: {
          plan: "Pro",
        },
      });
      return res.status(200).json({ message: "Payment verified" });
    } else {
      return res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed to verify payment" });
  }
};
