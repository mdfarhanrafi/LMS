import axiosInstance from "@/app/api/axiosInstance";
export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API}student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API}student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API}student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}