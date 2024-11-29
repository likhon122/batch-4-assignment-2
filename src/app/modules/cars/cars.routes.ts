import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getSingleCar,
  updateCar
} from "./cars.controller";

const carRouter = express.Router();

carRouter.post("/", createCar);
carRouter.get("/", getAllCars);
carRouter.get("/:carId", getSingleCar);
carRouter.put("/:carId", updateCar);
carRouter.delete("/:carId", deleteCar);

export default carRouter;
