'use client'
import { InstructorContext } from "@/context/instructor_context/instructorContext";
import { useContext } from "react";

const useInstructor=()=>useContext(InstructorContext)

export default useInstructor;