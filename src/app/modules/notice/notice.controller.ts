import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { NoticeService } from "./notice.service";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (req.files) {
    const files = req.files as any;

    if (files.profileImage) {
      payload.profileImage = "/uploads/" + files.profileImage[0].filename;
    }

    if (files.attachment) {
      payload.attachment = "/uploads/" + files.attachment[0].filename;
    }
  }

  const result = await NoticeService.createNotice(payload);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "Notice created successfully",
    data: result,
  });
});

export const NoticeController={
  createNotice,
}