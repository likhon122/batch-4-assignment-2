/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarSchema, TUpdateInfo } from "./cars.interface";
import CarModel from "./cars.model";

const createCarService = async (data: CarSchema) => {
  try {
    // Create a new car
    const createdCar = await CarModel.create(data);

    return createdCar;
  } catch (error: any) {
    throw Error(error);
  }
};

const getAllCarsService = async (searchTerm: string) => {
  try {
    const filter: Record<string, any> = {};

    if (searchTerm) {
      // make a case-insensitive regex search
      const searchRegex = new RegExp(searchTerm, "i");
      filter.$or = [
        { make: searchRegex },
        { model: searchRegex },
        { category: searchRegex }
      ];
    }

    const cars = await CarModel.find(filter);

    return cars;
  } catch (error: any) {
    throw Error(error);
  }
};

const getSingleCarService = async (carId: string) => {
  try {
    // Find a car by its id
    const car = await CarModel.findById(carId);

    return car;
  } catch (error: any) {
    throw Error(error);
  }
};

const updateCarService = async (
  validateCarId: string,
  validateUpdateInfo: TUpdateInfo
) => {
  try {
    // Find a car by its id and update it and return the updated car
    const car = await CarModel.findByIdAndUpdate(
      validateCarId,
      validateUpdateInfo,
      {
        new: true
      }
    );

    return car;
  } catch (error: any) {
    throw Error(error);
  }
};

const deleteCarService = async (validateCarId: string) => {
  try {
    // Find a car by its id and delete it
    const deletedCar = await CarModel.findByIdAndDelete(validateCarId);

    return deletedCar;
  } catch (error: any) {
    throw Error(error);
  }
};

export {
  createCarService,
  getAllCarsService,
  getSingleCarService,
  updateCarService,
  deleteCarService
};
