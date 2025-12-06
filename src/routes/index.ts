import express from "express";
import { NoticeRoutes } from "../app/modules/notice/notice.route";
 
 

const router = express.Router();

const apiRoutes = [
  {
    path: "/notice",
    route: NoticeRoutes,
  },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
