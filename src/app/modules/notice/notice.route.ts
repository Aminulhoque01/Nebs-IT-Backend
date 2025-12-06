import { Router } from "express";
import { NoticeController } from "./notice.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);


const router = Router();

router.post("/create-notice",  upload.fields([{ name: "attachment", maxCount: 1 }]), NoticeController.createNotice);

router.get("/notices", NoticeController.getAllNotices);
router.get("/:id", NoticeController.getAllNotices);

router.patch("/:id/toggle-status", NoticeController.toggleStatus);
 
router.put("/:id",upload.fields([{ name: "attachment", maxCount: 1 }]), NoticeController.updatedNotice);

router.patch("/:id", NoticeController.deleteNotice);

export const NoticeRoutes = router;