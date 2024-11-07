
import StudentCourse from "../../../server/model/StudentCourses.js"

class StudentBoughtController{
      static async getCoursesByStudentId (req,res){
        try {
            const { studentId } = req.params;
            const studentBoughtCourses = await StudentCourse.findOne({
              userId: studentId,
            });
            console.log(studentBoughtCourses)
            res.status(200).json({
              success: true,
              data: studentBoughtCourses.courses,
            });
           
          } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Some error occured!",
            });
          }
      }
   

}
export default StudentBoughtController