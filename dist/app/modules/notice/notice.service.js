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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const notice_module_1 = require("./notice.module");
const createNotice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield notice_module_1.Notice.create(payload);
});
const getAllNotices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let { page = 1, limit = 10, searchTerm, status, target, publishDate } = query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    // Searchable fields
    const searchableFields = ["title", "employeeId", "employeeName", "target"];
    const searchCondition = searchTerm
        ? {
            $or: searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        }
        : {};
    // Filter condition
    let filterCondition = {};
    if (status) {
        filterCondition.status = status;
    }
    if (target) {
        filterCondition.target = target;
    }
    // Final Query
    const queryCondition = {
        $and: [searchCondition, filterCondition],
    };
    const notices = yield notice_module_1.Notice.find(queryCondition)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = yield notice_module_1.Notice.countDocuments(queryCondition);
    return {
        data: notices,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_module_1.Notice.findById(id);
    return result;
});
const toggleStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield notice_module_1.Notice.findById(id);
    if (!notice)
        return null;
    // Never toggle Draft
    if (notice.status === "Draft")
        return notice;
    const nextStatus = {
        Published: "Unpublished",
        Unpublished: "Published",
    };
    // Cast the value as Status
    notice.status = nextStatus[notice.status];
    yield notice.save();
    return notice;
});
const updateNotice = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_module_1.Notice.findByIdAndUpdate(id, updateData, { new: true });
    return result; // this will be the updated document
});
const deleteNotice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_module_1.Notice.findByIdAndDelete(id);
    return result; // returns the deleted document, or null if not found
});
exports.NoticeService = {
    createNotice,
    getAllNotices,
    toggleStatus,
    updateNotice,
    deleteNotice,
    getSingle
};
