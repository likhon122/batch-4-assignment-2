/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { port } from "./app/config";
import carRouter from "./app/modules/cars/cars.routes";
import { ZodError } from "zod";
import orderRouter from "./app/modules/orders/order.routes";

const app = express();

app.use(
  cors({
    origin: [`http://localhost:${port}`]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routes are prefixed with /api
app.use("/api/cars", carRouter);
app.use("/api/orders", orderRouter);

// Fallback route for invalid routes
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message:
      "Route not found. Please make sure you are using the correct route.",
    success: false,
    error: {
      name: "RouteNotFound",
      errors: {}
    },
    stack: "No stack trace available"
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle ZodError (validation error)
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((e: any) => ({
      path: e.path.join("."),
      message: e.message
    }));

    res.status(400).json({
      message: "Validation error",
      success: false,
      error: {
        name: "ZodError",
        errors: zodErrors
      },
      stack: "No stack trace available"
    });
    return;
  }

  // Handle other errors
  const firstStackLine =
    "Error: " +
    (err.stack?.split("\n")[1]?.trim() || "No stack trace available");

  res.status(500).json({
    message: err.message,
    success: false,
    error: {
      name: err.name,
      errors: (err as any).errors || {}
    },
    stack: firstStackLine
  });
  return;
});

export default app;
