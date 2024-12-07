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

// Global Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle ZodError (validation error)
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, any> = {};

    err.errors.forEach((e: any) => {
      const path = e.path.join(".");
      formattedErrors[path] = {
        message: e.message,
        name: "ValidationError",
        properties: {
          message: e.code,
          expected: e.expected,
          received: e.received
        },
        kind: e.code,
        path: path,
        value: e.received
      };
    });

    // Get the stack trace and convert it to the desired format
    const stack = (num: number) => {
      return (
        (err.stack && err.stack.split("\n")[num])?.trim() ||
        "Error: Something went wrong"
      );
    };
    const stackLines = `Error: something went wrong: ${stack(3)} at ...`;

    // Send the structured error response
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: formattedErrors
      },
      stack: stackLines
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
