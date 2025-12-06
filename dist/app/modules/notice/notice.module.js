"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const mongoose_1 = require("mongoose");
const NoticeSchema = new mongoose_1.Schema({
    target: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    position: { type: String, required: true },
    noticeType: { type: String, required: true },
    publishDate: { type: Date, required: true },
    notice_body: { type: String },
    attachment: { type: String },
    status: {
        type: String,
        enum: ["Published", "Unpublished", "Draft"],
        default: "Draft",
    },
}, { timestamps: true });
exports.Notice = (0, mongoose_1.model)("Notice", NoticeSchema);
