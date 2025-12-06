import { Router } from "express";
import { NoticeController } from "./notice.controller";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);


const router = Router();

router.post("/create-notice",  upload.fields([{ name: "attachment", maxCount: 1 }]), NoticeController.createNotice);

router.get("/notices", NoticeController.getAllNotices);

router.patch("/:id/toggle-status", NoticeController.toggleStatus);
// Update a notice by ID
router.put("/:id",upload.fields([{ name: "attachment", maxCount: 1 }]), NoticeController.updatedNotice);


export const NoticeRoutes = router;