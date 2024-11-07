import express from "express"
import CourseController from "../../Controller/instructor/course-controller.js"

const router= express.Router()


router.post("/add", CourseController.store);
router.get("/get", CourseController.show);
router.get("/get/details/:id", CourseController.index);
router.put("/update/:id", CourseController.update);




export default router