import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load environment variables ONLY if not in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, "../../.env") });
}

// Define the schema for validating environment variables
const envVarsSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("5000"),
  SOCKET: z.string().default("8082"),
  MONGODB_URL: z.string().nonempty("MongoDB URL is required"),
  JWT_SECRET: z.string().nonempty("JWT secret is required"),
  JWT_EXPIRATION_TIME: z.string().default("1d"),
  JWT_REFRESH_EXPIRATION_TIME: z.string().default("180d"),
  BCRYPT_SALT_ROUNDS: z.string().default("12"),
  JWT_EXPIRES_IN_REMEMBER: z.string().default("30d"),
  JWT_EXPIRES_IN_DEFAULT: z.string().default("1d"),
  JWT_REFRESH_SECRET: z.string().optional(),
  BACKEND_IP: z.string().optional(),
});

// Validate environment variables
const envVars = envVarsSchema.safeParse(process.env);
if (!envVars.success) {
  console.error(envVars.error.format());
  throw new Error("Config validation error");
}

export default {
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
