import express from "express"
import CourseProgressController from "../../Controller/student/course_progress_controller.js"
const router= express.Router()

router.get("/get/:userId/:courseId", CourseProgressController.getCurrentCourseProgress);
router.post("/mark-lecture-viewed", CourseProgressController.markCurrentLectureAsViewed);
router.post("/reset-progress", CourseProgressController.resetCurrentCourseProgress);




export default router
