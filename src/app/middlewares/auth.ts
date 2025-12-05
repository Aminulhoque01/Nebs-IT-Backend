import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TokenExpiredError } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Step 1: Get Authorization Header
      const tokenWithBearer = req.headers.authorization;
      console.log("Authorization header:", tokenWithBearer);

      if (!tokenWithBearer) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized");
      }

      // Check for 'Bearer ' prefix with exact space
      if (tokenWithBearer.startsWith("Bearer ")) {
        // Extract token part
        const token = tokenWithBearer.split(" ")[1];
        console.log("Token extracted:", token);

        try {
          // Step 2: Verify Token

          // Step 3: Attach user to the request object

          // Step 5: Role-based Authorization

          // All good, proceed to next middleware
          next();
        } catch (err: any) {
          console.error("Token verification error:", err);
          if (err instanceof TokenExpiredError) {
            throw new ApiError(
              StatusCodes.UNAUTHORIZED,
              "Your session has expired. Please log in again."
            );
          }
          throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            "Invalid token. Please log in again."
          );
        }
      } else {
        // If token format is incorrect (e.g. missing Bearer or space)
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token format");
      }
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  };

export default auth;
