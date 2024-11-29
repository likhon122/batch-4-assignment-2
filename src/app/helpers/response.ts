import { Response } from "express";

type successResponseOptions = {
  message: string;
  success: true;
  data: unknown;
};

type errorResponseOptions = {
  message: string;
  success: false;
  error:
    | unknown
    | {
        name: string;
        message: string;
        errors: unknown;
      };
  stack: string | "No stack available";
};

// All success Response will be handled by this function
const successResponse = (
  res: Response,
  statusCode: number,
  options: successResponseOptions
) => {
  res.status(statusCode).json(options);
};

// All controller and services error  Response will be handled by this function
const errorResponse = (
  res: Response,
  statusCode: number,
  options: errorResponseOptions
) => {
  res.status(statusCode).json(options);
};

export { successResponse, errorResponse };
