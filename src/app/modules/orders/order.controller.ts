import { NextFunction, Request, Response } from "express";
import { makeOrderValidation } from "./orders.validation";
import { successResponse } from "../../helpers/response";

import { makeOrderService, totalRevenueService } from "./order.service";

const makeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderInfo = req.body;

    // Validate orderInfo
    const data = makeOrderValidation.parse(orderInfo);

    // Calling the makeOrderService function from order.service.ts
    const order = await makeOrderService(data, res);

    if (!order) {
      return;
    }

    return successResponse(res, 201, {
      message: "Order created successfully",
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

const totalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Calling the totalRevenueService function from order.service.ts
    const revenue = await totalRevenueService(res, next);

    return successResponse(res, 200, {
      message: "Total revenue fetched successfully",
      success: true,
      data: {
        totalRevenue: revenue.totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

export { makeOrder, totalRevenue };
