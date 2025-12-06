
export interface INotice {
  target: "Individual"  | "Sells" | "Operation";
  title: string;

  employeeId: string;
  employeeName: string;
  position: string;

  noticeType:
    | "Warning"
    | "Performance Improvement"
    | "Appreciation"
    | "Attendance"
    | "Payroll"
    | "Contract"
    | "Advisory";

  publishDate: Date;

  notice_body?: string;     // uploaded image
  attachment?: string;       // document pdf
  status: "Published" | "Unpublished" | "Draft";
}



interface INoticeQuery {
  page: number;
  limit: number;
  searchTerm?: string;
  status?: string;  
}

export default INoticeQuery;