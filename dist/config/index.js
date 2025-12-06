"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
// Load environment variables ONLY if not in production
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
}
// Define the schema for validating environment variables
const envVarsSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: zod_1.z.string().default("5000"),
    SOCKET: zod_1.z.string().default("8082"),
    MONGODB_URL: zod_1.z.string().nonempty("MongoDB URL is required"),
    JWT_SECRET: zod_1.z.string().nonempty("JWT secret is required"),
    JWT_EXPIRATION_TIME: zod_1.z.string().default("1d"),
    JWT_REFRESH_EXPIRATION_TIME: zod_1.z.string().default("180d"),
    BCRYPT_SALT_ROUNDS: zod_1.z.string().default("12"),
    JWT_EXPIRES_IN_REMEMBER: zod_1.z.string().default("30d"),
    JWT_EXPIRES_IN_DEFAULT: zod_1.z.string().default("1d"),
    JWT_REFRESH_SECRET: zod_1.z.string().optional(),
    BACKEND_IP: zod_1.z.string().optional(),
});
// Validate environment variables
const envVars = envVarsSchema.safeParse(process.env);
if (!envVars.success) {
    console.error(envVars.error.format());
    throw new Error("Config validation error");
}
exports.default = {
    env: envVars.data.NODE_ENV,
    port: envVars.data.PORT,
    socket_port: envVars.data.SOCKET,
    mongoose: {
        url: envVars.data.MONGODB_URL,
        options: {},
    },
    jwt: {
        accessSecret: envVars.data.JWT_SECRET,
        accessExpirationTime: envVars.data.JWT_EXPIRATION_TIME,
        refreshExpirationTime: envVars.data.JWT_REFRESH_EXPIRATION_TIME,
    },
    bcrypt: {
        saltRounds: envVars.data.BCRYPT_SALT_ROUNDS,
    },
    backendIp: envVars.data.BACKEND_IP,
};
