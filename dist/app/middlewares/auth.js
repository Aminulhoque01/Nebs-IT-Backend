"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const auth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Get Authorization Header
        const tokenWithBearer = req.headers.authorization;
        console.log("Authorization header:", tokenWithBearer);
        if (!tokenWithBearer) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized");
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
            }
            catch (err) {
                console.error("Token verification error:", err);
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your session has expired. Please log in again.");
                }
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid token. Please log in again.");
            }
        }
        else {
            // If token format is incorrect (e.g. missing Bearer or space)
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid token format");
        }
    }
    catch (error) {
        next(error); // Pass error to error handling middleware
    }
});
exports.default = auth;
