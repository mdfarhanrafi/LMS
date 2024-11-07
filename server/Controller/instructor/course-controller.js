import Course from "../../model/Course.js";

class CourseController {
  static async store(req, res) {
    try {
      let courseData = req.body;
      const { category,level,primaryLanguage} = courseData
      const newCategory = category.toLowerCase()
      const newlevel = level.toLowerCase()
      const newprimaryLanguage = primaryLanguage.toLowerCase()
     
      courseData =  {
        ...courseData,
        category:newCategory,
        level:newlevel,
        primaryLanguage:newprimaryLanguage,
      } 
      console.log(courseData)     

      const newlyCreatedCourse = new Course(courseData);
      const saveCourse = await newlyCreatedCourse.save();

      if (saveCourse) {
        res.status(201).json({
          success: true,
          message: "Course saved successfully",
          data: saveCourse,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  }
  static async show(req, res) {
    try {
      const coursesList = await Course.find({});

      res.status(200).json({
        success: true,
        data: coursesList,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  }
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updatedCourseData = req.body;

      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        updatedCourseData,
        { new: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  }
  static async index(req, res) {
    try {
      const { id } = req.params;
      const courseDetails = await Course.findById(id);

      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          message: "Course not found!",
        });
      }

      res.status(200).json({
        success: true,
        data: courseDetails,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  }
}

export default CourseController;
