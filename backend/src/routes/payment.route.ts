import { Router } from "express"
import { createOrder, verifyPayment } from "../controllers/payment.controller"
import { validateToken } from "../middlewares/validateToken.middleware"

const router = Router()

router.post("/create-order", validateToken, createOrder)
router.post("/verify", validateToken, verifyPayment)

export default router