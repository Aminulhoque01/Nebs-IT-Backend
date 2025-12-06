"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notice_route_1 = require("../app/modules/notice/notice.route");
const router = express_1.default.Router();
const apiRoutes = [
    {
        path: "/notice",
        route: notice_route_1.NoticeRoutes,
    },
];
apiRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
