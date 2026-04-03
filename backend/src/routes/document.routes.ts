import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware";
import { upload } from "../middlewares/upload.middleware";
import { uploadDocument } from "../controllers/document.controller";

const router = Router();

router.post("/upload", validateToken, upload.single("resume"), uploadDocument);

export default router;