import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { NoticeService } from "./notice.service";

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (req.files) {
    const files = req.files as any;

   

    if (files.attachment) {
      payload.attachment = "/uploads/" + files.attachment[0].filename;
    }
  }
  // Default Draft if not provided
  if (!payload.status) {
    payload.status = "Draft";
  }

  const result = await NoticeService.createNotice(payload);

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "Notice created successfully",
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, searchTerm, status } = req.query;

  const result = await NoticeService.getAllNotices({
    page: Number(page),
    limit: Number(limit),
    searchTerm: searchTerm as string,
    status: status as string,  
  });

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "Notices fetched successfully",
    data: result,
  });
});


const toggleStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await NoticeService.toggleStatus(id);

  if (!result) {
    return sendResponse(res, {
      code: StatusCodes.NOT_FOUND,
      message: "Notice not found",
      data: null,
    });
  }

  sendResponse(res, {
    code: StatusCodes.OK,
    message: "Status toggled successfully",
    data: result,
  });
});


export const NoticeController = {
  createNotice,
  getAllNotices,
  toggleStatus
};
