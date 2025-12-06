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
exports.NoticeController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const notice_service_1 = require("./notice.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (req.files) {
        const files = req.files;
        if (files.attachment) {
            payload.attachment = "/uploads/" + files.attachment[0].filename;
        }
    }
    // Default Draft if not provided
    if (!payload.status) {
        payload.status = "Draft";
    }
    const result = yield notice_service_1.NoticeService.createNotice(payload);
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Notice created successfully",
        data: result,
    });
}));
const getAllNotices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, searchTerm, status, target, publishDate } = req.query;
    const result = yield notice_service_1.NoticeService.getAllNotices({
        page: Number(page),
        limit: Number(limit),
        searchTerm: searchTerm,
        status: status,
        target: target,
    });
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Notices fetched successfully",
        data: result,
    });
}));
const getSingle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            success: false,
            message: "Invalid ID format",
        });
        return;
    }
    const result = yield notice_service_1.NoticeService.getSingle(id);
    if (!result) {
        res.status(404).json({
            success: false,
            message: "Notice not found",
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Notice fetched successfully",
        data: result,
    });
}));
const toggleStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield notice_service_1.NoticeService.toggleStatus(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "Notice not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Status toggled successfully",
        data: result,
    });
}));
const updatedNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticeId = req.params.id;
    const updateData = Object.assign({}, req.body);
    // Clean all text fields
    for (const key in updateData) {
        if (typeof updateData[key] === "string") {
            updateData[key] = updateData[key].replace(/["]+/g, "").trim();
        }
    }
    // Optional: handle file
    if (req.file) {
        updateData.filePath = req.file.path;
    }
    const updated = yield notice_service_1.NoticeService.updateNotice(noticeId, updateData);
    if (!updated) {
        return (0, sendResponse_1.default)(res, {
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "Notice not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Notice updated successfully",
        data: updated,
    });
}));
const deleteNotice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticeId = req.params.id;
    const deleted = yield notice_service_1.NoticeService.deleteNotice(noticeId);
    if (!deleted) {
        return (0, sendResponse_1.default)(res, {
            code: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "Notice not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        code: http_status_codes_1.StatusCodes.OK,
        message: "Notice deleted successfully",
        data: deleted,
    });
}));
exports.NoticeController = {
    createNotice,
    getAllNotices,
    toggleStatus,
    updatedNotice,
    deleteNotice,
    getSingle
};
