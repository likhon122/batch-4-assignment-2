import mongoose, { Schema } from "mongoose";
import { OrderSchema } from "./order.interface";

const orderSchema = new Schema<OrderSchema>(
  {
    email: {
      type: String,
      required: [true, "Email is required to make an order"],
      trim: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Car is required to make an order"],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required to make an order"],
      trim: true
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required to make an order"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const OrderModel = mongoose.model<OrderSchema>("Order", orderSchema);

export default OrderModel;
