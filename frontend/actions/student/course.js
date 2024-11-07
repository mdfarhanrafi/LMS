import axiosInstance from "@/app/api/axiosInstance";

export async function GetStudentCourse(query) {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API}student/course/get?${query}`
  );
  return data;
}

export async function GetStudentCourseDetailsByID(id) {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API}student/course/get/details/${id}`
  );
  return data;
}

export async function FetchStudentBoughtCoursesService(studentId) {
  try {
    if (!studentId) {
      throw new Error("Student ID is required");
    }

    const { data } = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API}student/courses-bought/get/${studentId}`
    );
    return data;
  } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}


export async function checkCoursePurchaseInfo(courseId, studentId) {
  
   try {
     const { data } = await axiosInstance.get(
       `${process.env.NEXT_PUBLIC_API}student/course/purchase-info/${courseId}/${studentId}`
     );
   
     return data;
    
   } catch (error) {
    console.error("Service Error:", error);
    return {
      success: false,
      message: error.message,
    };
   }
}
