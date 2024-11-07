'use client'


import React from 'react'
import { Card,CardContent,CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useStudent from '@/lib/hooks/useStudent'
import useAuth from '@/lib/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Watch } from "lucide-react";
import { useEffect } from 'react'
import {FetchStudentBoughtCoursesService} from "@/actions/student/course.js"
const BoughtCourse = () => {
  const {studentBoughtCoursesList, setStudentBoughtCoursesList} = useStudent()
  const {auth} = useAuth() 
  const router= useRouter()
   console.log(auth?.user?._id)
  async function  fetchStudentBoughtCourses() {
    try {
      // if (!auth?.user?._id) {
      //   console.log('No user ID available yet')
      //   return
      // }

      const response = await FetchStudentBoughtCoursesService(auth?.user?._id);
      if (response?.success) {
        setStudentBoughtCoursesList(response?.data);
      }else{
        console.log('Failed to fetch courses:', response?.message);
      }
      
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  } 



  useEffect(() => {
    fetchStudentBoughtCourses();
  }, [auth?.user?._id]);
  
  if (!auth?.user?._id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold mb-8">My Courses</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
        studentBoughtCoursesList.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardContent className="p-4 flex-grow">
              <img
                src={course?.courseImage}
                alt={course?.title}
                className="h-52 w-full object-cover rounded-md mb-4"
              />
              <h3 className="font-bold mb-1">{course?.title}</h3>
              <p className="text-sm text-gray-700 mb-2">
                {course?.instructorName}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={()=>router.push(`/student/course-progress/${course?.courseId}`)}
                className="flex-1"
              >
                <Watch className="mr-2 h-4 w-4" />
                Start Watching
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <h1 className="text-3xl font-bold">No Courses found</h1>
      )}
    </div>
  </div>
  )
}

export default BoughtCourse