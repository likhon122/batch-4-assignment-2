import { ObjectId } from "mongoose";

export type OrderSchema = {
  email: string;
  car: ObjectId;
  quantity: number;
  totalPrice: number;
};

export type TOrderBody = {
  email: string;
  car: string;
  quantity: number;
};
