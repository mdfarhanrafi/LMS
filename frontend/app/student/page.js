'use client'
import Image from "next/image"
import {courseCategories} from "@/lib/config/data.js"
import { Button } from "@/components/ui/button"
import useStudent from "@/lib/hooks/useStudent.js"
import {checkCoursePurchaseInfo, GetStudentCourse} from "@/actions/student/course.js"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/lib/hooks/useAuth"
export default function Student(){
    const router= useRouter()
    const {auth} = useAuth()
    const {studentViewCoursesList, setStudentViewCoursesList} = useStudent()
    async function FetchStudentCourse() {
       const response  = await GetStudentCourse()
       if(response?.success){
        setStudentViewCoursesList(response?.data)
       }
     }
   
     async function handleCourseNavigate(getCurrentCourseId) {
      const response = await checkCoursePurchaseInfo(
        getCurrentCourseId,
        auth?.user?._id
      );
  
      if (response?.success) {
        if (response?.data) {
         router.push(`/student/course-progress/${getCurrentCourseId}`);
        } else {
          router.push(`/student/course/${getCurrentCourseId}`);
        }
      }
    }
    async function handleNavigateToCoursesPage(getCurrentId) {
      sessionStorage.removeItem("filters");
      const currentFilter = {
        category: [getCurrentId],
      };
  
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));

      router.push('/student/courses')
    }
  
 


     useEffect(()=>{
           FetchStudentCourse()
      },[]) 
 

    return (
      <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning thet gets you</h1>
          <p className="text-xl">
            Skills for your present and your future. Get Started with US
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <Image
            src={"/banner.png"}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured COourses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <Image
                  src={courseItem?.image}
                  width={150}
                  height={300}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1> 
          )}
        </div>
      </section>
 
    </div>
    )
}