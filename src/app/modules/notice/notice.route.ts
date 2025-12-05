
export interface INotice {
  target: "Individual" | "Department" | "Sells" | "Operation";
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

  profileImage?: string;     // uploaded image
  attachment?: string;       // document pdf
}
