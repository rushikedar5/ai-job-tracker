import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "@/routes/auth.routes"
import applicationRoutes from "@/routes/application.route";
import documentRoutes from "@/routes/document.routes";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://hirevault.vercel.app",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/documents", documentRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}/`)
})
