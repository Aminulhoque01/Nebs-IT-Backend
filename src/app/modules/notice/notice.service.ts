import { Notice } from "./notice.module";


const createNotice = async(payload:string)=>{
   return await Notice.create(payload);
}

export const  NoticeService={
  createNotice
}