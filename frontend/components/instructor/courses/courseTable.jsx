"use client"
import React,{useEffect,useContext} from "react";
import { Edit,Delete } from "lucide-react";
import { InstructorContext } from "@/context/instructor_context/instructorContext";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from "@/components/ui/button";  
import { fetchallCourse } from "@/actions/course/course";
import { useRouter } from "next/navigation";
  
export default function CourseTable() {
  const router =  useRouter() 
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function FetchAllCoursesList() {
        
      const response = await fetchallCourse()
      
      if(response?.success) setInstructorCoursesList(response?.data);

        
 

  }
  useEffect(()=>{
    FetchAllCoursesList()
  },[])






  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            { instructorCoursesList && instructorCoursesList.length>0 ?
             instructorCoursesList.map((course)=>(
          <TableRow>




            <TableCell className="font-medium">
             {course.title}
            </TableCell>
            <TableCell>{course?.students?.length}</TableCell>
            <TableCell>${course?.students?.length * course?.pricing}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={()=>{router.push(`/instructor/course/${course?._id}`)}}
              >
                <Edit className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="sm">
                <Delete className="h-6 w-6" />
              </Button>
            </TableCell>


          </TableRow>
            )):null}
        </TableBody>
      </Table>
    </div>
  );
}
