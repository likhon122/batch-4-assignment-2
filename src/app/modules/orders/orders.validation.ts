import { z } from "zod";

export const makeOrderValidation = z.object({
  email: z
    .string({
      required_error: "Email is required to make an order",
      invalid_type_error: "Email must be a string"
    })
    .email("Invalid email address format"),

  car: z
    .string({
      required_error: "Car ID is required to make an order",
      invalid_type_error: "Car ID must be a string"
    })
    .refine((id) => /^[a-f\d]{24}$/i.test(id), "Invalid Car ID format"),

  quantity: z
    .number({
      required_error: "Quantity is required to make an order",
      invalid_type_error: "Quantity must be a number"
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
});
