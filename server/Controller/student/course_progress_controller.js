import Progress from "../../model/CourseProgress.js";
import Course from "../../model/Course.js";
import StudentCourse from "../../model/StudentCourses.js";
class CourseProgressController {
    static async getCurrentCourseProgress(req,res){
        try {
            const { userId, courseId } = req.params;
        
            const studentPurchasedCourses = await StudentCourse.findOne({ userId });
        
            const isCurrentCoursePurchasedByCurrentUserOrNot =
              studentPurchasedCourses?.courses?.findIndex(
                (item) => item.courseId === courseId
              ) > -1;
        
            if (!isCurrentCoursePurchasedByCurrentUserOrNot) {
              return res.status(200).json({
                success: true,
                data: {
                  isPurchased: false,
                },
                message: "You need to purchase this course to access it.",
              });
            }
        
            const currentUserCourseProgress = await Progress.findOne({
              userId,
              courseId,
            });
        
            if (
              !currentUserCourseProgress ||
              currentUserCourseProgress?.lecturesProgress?.length === 0
            ) {
              const course = await Course.findById(courseId);
              if (!course) {
                return res.status(404).json({
                  success: false,
                  message: "Course not found",
                });
              }
        
              return res.status(200).json({
                success: true,
                message: "No progress found, you can start watching the course",
                data: {
                  courseDetails: course,
                  progress: [],
                  isPurchased: true,
                },
              });
            }
        
            const courseDetails = await Course.findById(courseId);
        
            res.status(200).json({
              success: true,
              data: {
                courseDetails,
                progress: currentUserCourseProgress.lecturesProgress,
                completed: currentUserCourseProgress.completed,
                completionDate: currentUserCourseProgress.completionDate,
                isPurchased: true,
              },
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Some error occured!",
            });
          } 
    }
    static async markCurrentLectureAsViewed(req,res){
        try {
            const { userId, courseId, lectureId } = req.body;
        
            let progress = await Progress.findOne({ userId, courseId });
            if (!progress) {
              progress = new Progress({
                userId,
                courseId,
                lecturesProgress: [
                  {
                    lectureId,
                    viewed: true,
                    dateViewed: new Date(),
                  },
                ],
              });
              await progress.save();
            } else {
              const lectureProgress = progress.lecturesProgress.find(
                (item) => item.lectureId === lectureId
              );
        
              if (lectureProgress) {
                lectureProgress.viewed = true;
                lectureProgress.dateViewed = new Date();
              } else {
                progress.lecturesProgress.push({
                  lectureId,
                  viewed: true,
                  dateViewed: new Date(),
                });
              }
              await progress.save();
            }
        
            const course = await Course.findById(courseId);
        
            if (!course) {
              return res.status(404).json({
                success: false,
                message: "Course not found",
              });
            }
        
            //check all the lectures are viewed or not
            const allLecturesViewed =
              progress.lecturesProgress.length === course.curriculum.length &&
              progress.lecturesProgress.every((item) => item.viewed);
        
            if (allLecturesViewed) {
              progress.completed = true;
              progress.completionDate = new Date();
        
              await progress.save();
            }
        
            res.status(200).json({
              success: true,
              message: "Lecture marked as viewed",
              data: progress,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Some error occured!",
            });
          }    
    }
    static async resetCurrentCourseProgress(req,res){
        try {
            const { userId, courseId } = req.body;
        
            const progress = await Progress.findOne({ userId, courseId });
        
            if (!progress) {
              return res.status(404).json({
                success: false,
                message: "Progress not found!",
              });
            }
        
            progress.lecturesProgress = [];
            progress.completed = false;
            progress.completionDate = null;
        
            await progress.save();
        
            res.status(200).json({
              success: true,
              message: "Course progress has been reset",
              data: progress,
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

export default CourseProgressController