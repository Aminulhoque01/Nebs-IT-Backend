"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRoutes = void 0;
const express_1 = require("express");
const notice_controller_1 = require("./notice.controller");
const fileUploadHandler_1 = __importDefault(require("../../middlewares/fileUploadHandler"));
const UPLOADS_FOLDER = 'uploads/users';
const upload = (0, fileUploadHandler_1.default)(UPLOADS_FOLDER);
const router = (0, express_1.Router)();
router.post("/create-notice", upload.fields([{ name: "attachment", maxCount: 1 }]), notice_controller_1.NoticeController.createNotice);
router.get("/notices", notice_controller_1.NoticeController.getAllNotices);
router.patch("/:id/toggle-status", notice_controller_1.NoticeController.toggleStatus);
router.get("/:id", notice_controller_1.NoticeController.getSingle);
router.put("/:id", upload.fields([{ name: "attachment", maxCount: 1 }]), notice_controller_1.NoticeController.updatedNotice);
router.delete("/:id", notice_controller_1.NoticeController.deleteNotice);
exports.NoticeRoutes = router;
