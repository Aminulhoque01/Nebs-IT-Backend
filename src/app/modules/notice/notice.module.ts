import { model, Schema } from "mongoose";
import { INotice } from "./notice.interface";

const NoticeSchema = new Schema<INotice>(
  {
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
  },
  { timestamps: true }
);

export const Notice = model<INotice>("Notice", NoticeSchema);
