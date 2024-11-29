import { NextFunction, Request, Response } from "express";

import {
  createCarValidation,
  updateCarValidation,
  validateQueryId
} from "./cars.validation";
import { errorResponse, successResponse } from "../../helpers/response";
import {
  createCarService,
  deleteCarService,
  getAllCarsService,
  getSingleCarService,
  updateCarService
} from "./cars.service";

const createCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carDetails = req.body;

    const data = createCarValidation.parse(carDetails);

    if (data.quantity < 1) {
      data.inStock = false;
    } else {
      data.inStock = true;
    }

    // calling the createCarService function in cars.service.ts
    const createdCar = await createCarService(data);

    if (!createdCar) {
      return errorResponse(res, 400, {
        message: "Car could not be created. Please try again",
        success: false,
        error: {
          name: "CarCreationError",
          message: "Car could not be created. Please try again",
          errors: {}
        },
        stack: "No stack available"
      });
    }

    return successResponse(res, 201, {
      message: "Car created Successfully",
      success: true,
      data: createdCar
    });
  } catch (err) {
    return next(err);
  }
};

const getAllCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchTerm } = req.query;

    // Calling the getAllCarsService function in cars.service.ts
    const cars = await getAllCarsService(searchTerm as string);

    return successResponse(res, 200, {
      message: "Cars retrieved successfully",
      success: true,
      data: cars
    });
  } catch (error) {
    return next(error);
  }
};

const getSingleCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { carId } = req.params;

    const data = validateQueryId.parse({ carId });

    // Calling the getSingleCarService function in cars.service.ts
    const car = await getSingleCarService(data.carId);

    if (!car) {
      return errorResponse(res, 404, {
        message: "Car not found! Please provide correct car ID",
        success: false,
        error: {
          name: "Not found",
          message: "Car not found! Please provide correct car ID",
          errors: {}
        },
        stack: "No stack available"
      });
    }

    return successResponse(res, 200, {
      message: "Car retrieved successfully",
      success: true,
      data: car
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { carId } = req.params;

    const { carId: validateCarId } = validateQueryId.parse({ carId });

    const updateInfo = req.body;

    if (!Object.keys(updateInfo).length) {
      return errorResponse(res, 400, {
        message: "Please provide the details to update",
        success: false,
        error: {
          name: "Bad Request",
          message: "Please provide the details to update",
          errors: {}
        },
        stack: "No stack available"
      });
    }

    const validateUpdateInfo = updateCarValidation.parse(updateInfo);

    // Calling the updateCarService function in cars.service.ts
    const car = await updateCarService(validateCarId, validateUpdateInfo);

    if (!car) {
      return errorResponse(res, 404, {
        message: "Car not found! Please provide correct car ID",
        success: false,
        error: {
          name: "Not found",
          message: "Car not found! Please provide correct car ID",
          errors: {}
        },
        stack: "No stack available"
      });
    }

    return successResponse(res, 200, {
      message: "Car updated successfully",
      success: true,
      data: car
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { carId } = req.params;

    const { carId: validateCarId } = validateQueryId.parse({ carId });

    // Calling the deleteCarService function in cars.service.ts
    const deletedCar = await deleteCarService(validateCarId);

    if (!deletedCar) {
      return errorResponse(res, 404, {
        message: "Car not found! Please provide correct car ID. Or try again.",
        success: false,
        error: {
          name: "Not found",
          message:
            "Car not found! Please provide correct car ID. Or try again.",
          errors: {}
        },
        stack: "No stack available"
      });
    }

    return successResponse(res, 200, {
      message: "Car deleted successfully",
      success: true,
      data: {}
    });
  } catch (error) {
    return next(error);
  }
};

export { createCar, getAllCars, getSingleCar, updateCar, deleteCar };
