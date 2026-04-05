import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../libs/cloudinary"

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "hirevault/resumes",
        allowed_formats: ["pdf"],
        resource_type: "raw"
    } as any
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only PDF files allowed"))
        }
    }
})