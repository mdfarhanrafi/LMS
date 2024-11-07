"use client"
import { Button } from '@/components/ui/button'
import { CardHeader,Card,CardContent,CardTitle } from '@/components/ui/card'
import React from 'react'
import CourseTable from '@/components/instructor/courses/courseTable'
import { useRouter } from 'next/navigation'
const Course = () => {
   const router = useRouter()
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button className="p-6" onClick= {()=>router.push('/newCourses')}>
           Add new Courses
        </Button>
      </CardHeader>
      <CardContent>
        <CourseTable/>  
      </CardContent>      
   </Card>
  )
}

export default Course