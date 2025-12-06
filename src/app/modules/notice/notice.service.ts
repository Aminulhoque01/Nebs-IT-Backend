import INoticeQuery from "./notice.interface";
import { Notice } from "./notice.module";

const createNotice = async (payload: string) => {
  return await Notice.create(payload);
};



const getAllNotices = async (query: INoticeQuery) => {
  let { page = 1, limit = 10, searchTerm, status } = query;

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
  let filterCondition: Record<string, any> = {};

  if (status) {
    filterCondition.status = status; // Published | Unpublished | Draft
  }

  // Final Query
  const queryCondition = {
    $and: [searchCondition, filterCondition],
  };

  const notices = await Notice.find(queryCondition)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notice.countDocuments(queryCondition);

  return {
    data: notices,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


export const NoticeService = {
  createNotice,
  getAllNotices
};
