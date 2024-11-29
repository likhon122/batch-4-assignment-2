import { z } from "zod";

// Define Zod Schema for CreateCarSchema
export const createCarValidation = z.object({
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, "Brand cannot be empty"),

  model: z
    .string({ required_error: "Model is required" })
    .min(1, "Model cannot be empty"),

  year: z
    .number({ required_error: "Year is required" })
    .int("Year must be an integer")
    .gte(1886, "Year must be 1886 or later (first car invention year)")
    .lte(
      new Date().getFullYear(),
      `Year cannot be later than the current year`
    ),

  price: z
    .number({ required_error: "Price is required" })
    .gte(0, "Price must be 0 or greater"),

  category: z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
    required_error: "Category is required",
    invalid_type_error:
      "Category must be one of: Sedan, SUV, Truck, Coupe, Convertible"
  }),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters long"),

  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .gte(0, "Quantity must be 0 or greater"),

  inStock: z
    .boolean({ required_error: "In stock status is required" })
    .optional()
});

// Define Zod Schema for getSingleCar
export const validateQueryId = z.object({
  carId: z
    .string({ required_error: "Car ID is required for fetching a single car!" })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid car ID format. Make sure you provide a valid Id format"
    })
});

// Define Zod Schema for updateCar
export const updateCarValidation = z.object({
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, "Brand cannot be empty")
    .optional(),

  model: z
    .string({ required_error: "Model is required" })
    .min(1, "Model cannot be empty")
    .optional(),

  year: z
    .number({ required_error: "Year is required" })
    .int("Year must be an integer")
    .gte(1886, "Year must be 1886 or later (first car invention year)")
    .lte(new Date().getFullYear(), `Year cannot be later than the current year`)
    .optional(),

  price: z
    .number({ required_error: "Price is required" })
    .gte(0, "Price must be 0 or greater")
    .optional(),

  category: z
    .enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
      required_error: "Category is required",
      invalid_type_error:
        "Category must be one of: Sedan, SUV, Truck, Coupe, Convertible"
    })
    .optional(),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters long")
    .optional(),

  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .gte(0, "Quantity must be 0 or greater")
    .optional(),

  inStock: z
    .boolean({ required_error: "In stock status is required" })
    .optional()
});
