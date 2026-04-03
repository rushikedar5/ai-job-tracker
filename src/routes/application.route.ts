import { Router } from "express";
import { createApplication, deleteApplication, getApplication, getApplicationById, updateApplication } from "../controllers/application.controller";
import { validateApplication } from "../middlewares/application.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/", validateToken, validateApplication, createApplication);
router.get("/", validateToken, getApplication);
router.get("/:id", validateToken, getApplicationById);
router.put("/:id", validateToken, updateApplication);
router.delete("/:id", validateToken, deleteApplication);

export default router;