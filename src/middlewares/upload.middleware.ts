import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")  // folder where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // only allow PDFs
        if(file.mimetype === "application/pdf") {
            cb(null, true)
        } else {
            cb(new Error("Only PDF files allowed"))
        }
    }
})