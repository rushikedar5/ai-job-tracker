import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes";
import applicationRoutes from "../src/routes/application.route";
import documentRoutes from "../src/routes/document.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/documents", documentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/`)
})
