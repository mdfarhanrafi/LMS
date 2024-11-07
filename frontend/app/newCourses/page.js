'use client'
import React, { useContext } from 'react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { courseCurriculumInitialFormData,courseLandingInitialFormData } from '@/lib/config/data'
import { Button } from '@/components/ui/button'
import  CourseCurriculam  from '@/components/instructor/add_new_courses/courseCurriculam'
import Settings from '@/components/instructor/add_new_courses/settings'
import CourseLanding from  "@/components/instructor/add_new_courses/courseLanding"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstructorContext } from '@/context/instructor_context/instructorContext'
import { AuthContext } from '@/context/auth-context'
import { newCourse,fetchallCourse,fetchallCourseById,updateCourseById } from '@/actions/course/course'
const NewCourse = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const {auth} = useContext(AuthContext)
  async function handleCreateCourse(){
       const newCourseFormData= {
        instructorId: auth?.user._id,
        instructorName: auth?.user.userName,
        date: new Date(),
        ...    courseLandingFormData,
        students: [
           ],
        curriculum: courseCurriculumFormData,
        isPublised: true,
       }
    
      const response = await newCourse(newCourseFormData) 


      if(response?.success){
        setCourseLandingFormData(courseLandingInitialFormData);
        setCourseCurriculumFormData(courseCurriculumInitialFormData);
        window.history.go(-1)
      }

     
  }

 

   

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
        <Button
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculam />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewCourse