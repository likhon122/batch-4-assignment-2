import express from "express";
import { makeOrder, totalRevenue } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post("/", makeOrder);
orderRouter.get("/revenue", totalRevenue);

export default orderRouter;
