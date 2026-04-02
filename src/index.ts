import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes"

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/`)
})
