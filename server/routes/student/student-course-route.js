import express from "express"
import StudentBoughtController from "../../Controller/student/student-course-controller.js";
const router = express.Router();

router.get("/get/:studentId", StudentBoughtController.getCoursesByStudentId);

export default router
