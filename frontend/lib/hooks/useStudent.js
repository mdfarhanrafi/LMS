'use client'
import {StudentContext} from "@/context/student_context/student-context"
import { useContext } from "react"


const useStudent = () => useContext(StudentContext);


export default useStudent;