import express from "express"
import StudentCourseView from "../../Controller/student/course-controller.js"

const router = express.Router()


router.get('/get',StudentCourseView.getAllStudentViewCourses)
router.get('/get/details/:id',StudentCourseView.getStudentViewCourseDetails)
router.get('/purchase-info/:id/:studentId',StudentCourseView.checkCoursePurchaseInfo)



export default router
