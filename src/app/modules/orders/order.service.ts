import { NextFunction, Response } from "express";

import CarModel from "../cars/cars.model";
import { TOrderBody } from "./order.interface";
import { errorResponse } from "../../helpers/response";
import OrderModel from "./order.model";

const makeOrderService = async (data: TOrderBody, res: Response) => {
  try {
    // Find car details and check if it is in stock
    const carDetails = await CarModel.findById(data.car);

    if (!carDetails) {
      return errorResponse(res, 404, {
        message: "Car not found. Please provide a valid car ID!",
        success: false,
        error: {
          name: "NotFound",
          errors: {
            name: "CarNotFound",
            message: "Car not found. Please provide a valid car ID"
          }
        },
        stack: "No stack trace available"
      });
    }

    if (carDetails.inStock === false || carDetails.quantity === 0) {
      return errorResponse(res, 400, {
        message: "Car is out of stock. Please choose another car!",
        success: false,
        error: {
          name: "OutOfStock",
          errors: {
            name: "CarOutOfStock",
            message: "Car is out of stock"
          }
        },
        stack: "No stack trace available"
      });
    }

    if (data.quantity > carDetails.quantity) {
      return errorResponse(res, 400, {
        message:
          "Quantity requested is more than the available quantity. Please reduce the quantity!",
        success: false,
        error: {
          name: "InvalidQuantity",
          errors: {
            name: "QuantityExceedsStock",
            message: "Quantity requested is more than the available quantity"
          }
        },
        stack: "No stack trace available"
      });
    }

    // Create an instance of OrderModel
    const order = new OrderModel({
      email: data.email,
      car: data.car,
      quantity: data.quantity,
      totalPrice: data.quantity * carDetails.price
    });

    const decreaseQuantity = carDetails.quantity - data.quantity;

    if (decreaseQuantity === 0) {
      carDetails.inStock = false;
    }

    // Update car quantity and inStock status and save order
    const [, saveOrder] = await Promise.all([
      CarModel.findByIdAndUpdate(
        data.car,
        { quantity: decreaseQuantity, inStock: carDetails.inStock },
        { new: true }
      ),
      order.save()
    ]);

    return saveOrder;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw Error(error);
  }
};

const totalRevenueService = async (res: Response, next: NextFunction) => {
  try {
    // Calculate total Revenue
    const totalRevenue = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    // If there is no revenue, return totalRevenue 0
    if (totalRevenue.length === 0) {
      return {
        totalRevenue: 0
      };
    }

    return totalRevenue[0];
  } catch (error) {
    next(error);
  }
};

export { makeOrderService, totalRevenueService };
