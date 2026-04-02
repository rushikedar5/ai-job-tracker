import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import { validateSignIn, validateSignUp } from "../middlewares/validateAuth";

const router = Router();

router.post("/signUp", validateSignUp, signUp);
router.post("/signIn", validateSignIn, signIn);

export default router;