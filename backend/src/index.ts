import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "@/routes/auth.routes"
import applicationRoutes from "@/routes/application.route";
import documentRoutes from "@/routes/document.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/documents", documentRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/`)
})
