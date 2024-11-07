import express from "express"
import MediaController from "../../Controller/instructor/media-controller.js"
import { uploadMediaToCloudinary } from "../../helpers/cloudinary.js";
import multer from "multer";
const router = express.Router()



const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"),MediaController.upload);    
router.post('/bulk-upload',upload.array("files", 10),MediaController.bulkUpload)
router.delete('/delete/:id',MediaController.delete)






export default router
