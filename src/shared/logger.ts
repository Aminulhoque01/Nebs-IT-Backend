import winston from "winston";

const transports = [];

if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console()
    // Your file transport here for local dev
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports,
});

export default logger;
