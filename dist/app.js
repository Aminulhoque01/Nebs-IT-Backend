"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFount_1 = __importDefault(require("./app/middlewares/notFount"));
const routes_1 = __importDefault(require("./routes"));
const morgen_1 = require("./shared/morgen");
const app = (0, express_1.default)();
// morgan
app.use(morgen_1.Morgan.successHandler);
app.use(morgen_1.Morgan.errorHandler);
// body parser
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Use cookie-parser to parse cookies
app.use((0, cookie_parser_1.default)());
// file retrieve
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// router
app.use("/api/v1", routes_1.default);
// live response
app.get("/test", (req, res) => {
    res.status(201).json({ message: "Welcome to Thera Track Server" });
});
// global error handle
app.use(globalErrorHandler_1.default);
// handle not found route
app.use(notFount_1.default);
exports.default = app;
