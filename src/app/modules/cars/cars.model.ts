import { model, Schema } from "mongoose";
import { CarSchema } from "./cars.interface";

const carSchema = new Schema<CarSchema>(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"]
    },

    model: {
      type: String,
      required: [true, "Model is required"]
    },

    year: {
      type: Number,
      required: [true, "Year is required"]
    },

    price: {
      type: Number,
      required: [true, "Price is required"]
    },

    category: {
      type: String,
      enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
      required: [
        true,
        "Category is required and must be one of the following: Sedan, SUV, Truck, Coupe, Convertible"
      ]
    },

    description: {
      type: String,
      minlength: [10, "Description must be at least 10 characters long"],
      required: [true, "Description is required and minimum 10 characters long"]
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"]
    },

    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const CarModel = model<CarSchema>("Car", carSchema);

export default CarModel;
