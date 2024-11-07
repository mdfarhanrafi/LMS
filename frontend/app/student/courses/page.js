"use client";
import React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import useStudent from "@/lib/hooks/useStudent";
import { sortOptions, filterOptions } from "@/lib/config/data";
import { Checkbox } from "@/components/ui/checkbox";
import { checkCoursePurchaseInfo, GetStudentCourse } from "@/actions/student/course.js";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/lib/hooks/useAuth";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${encodeURIComponent(key)}=${paramValue}`);
    }
  }

  return queryParams.join("&");
}

const StudentCourse = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {auth}= useAuth() 
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useStudent();

  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption.id);
      if (indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    console.log(query)

    const response = await GetStudentCourse(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
  }

  async function handleCourseNavigate(getCurrentCourseId){
      
      const response = await checkCoursePurchaseInfo(getCurrentCourseId, auth?.user?._id)
      if(response?.success){
        if (response?.data) {
          router.push(`/student/course-progress/${getCurrentCourseId}`);
        } else {
          router.push(`/student/course/${getCurrentCourseId}`);
        }
        
      }

      
     
  }
 

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    const params = new URLSearchParams(searchParams);
    if (buildQueryStringForFilters) {
      router.push(`?${buildQueryStringForFilters}`);
    } else {
      router.push("/student/courses"); // Clear params if no filters
    }
  }, [filters]);
  

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {Object.keys(filterOptions).map((ketItem) => (
              <div className="p-4 border-b">
                <h3 className="font-bold mb-3">{ketItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[ketItem].map((option) => (
                    <Label className="flex font-medium items-center gap-3">
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[ketItem] &&
                          filters[ketItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(ketItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentViewCoursesList.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseItem) => (
                <Card
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="cursor-pointer"
                  key={courseItem?._id}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        className="w-ful h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By{" "}
                        <span className="font-bold">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseItem?.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : loadingState ? (
              <Skeleton />
            ) : (
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentCourse;

// "use client";
// import React from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { ArrowUpDownIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Label } from "@/components/ui/label";
// import useStudent from "@/lib/hooks/useStudent";
// import { sortOptions, filterOptions } from "@/lib/config/data";
// import { Checkbox } from "@/components/ui/checkbox";
// import { GetStudentCourse } from "@/actions/student/course";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const StudentCourse = () => {
//   const {
//     studentViewCoursesList,
//     setStudentViewCoursesList,
//     loadingState,
//     setLoadingState,
//   } = useStudent();

//   const [sort, setSort] = useState("price-lowtohigh");
//   const [filters, setFilters] = useState({});

//   // Simplified filter change handler
//   const handleFilterChange = (sectionId, option) => {
//     setFilters(prev => {
//       const newFilters = { ...prev };
      
//       if (!newFilters[sectionId]) {
//         newFilters[sectionId] = [option.id];
//       } else {
//         const index = newFilters[sectionId].indexOf(option.id);
//         if (index === -1) {
//           newFilters[sectionId].push(option.id);
//         } else {
//           newFilters[sectionId] = newFilters[sectionId].filter(id => id !== option.id);
//           if (newFilters[sectionId].length === 0) {
//             delete newFilters[sectionId];
//           }
//         }
//       }
      
//       return newFilters;
//     });
//   };

//   // Fetch courses whenever filters or sort changes
//   useEffect(() => {
//     const fetchCourses = async () => {
//       setLoadingState(true);
//       console.log('Current Filters:', filters.level); // Debug log
//       console.log('Current Sort:', sort); // Debug log
      
//       const response = await GetStudentCourse(filters, sort);
      
//       if (response?.success) {
//         setStudentViewCoursesList(response.data);
//       }
      
//       setLoadingState(false);
//     };

//     fetchCourses();
//   }, [filters, sort]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      
//       {/* Debug section */}
//       <div className="mb-4 p-2 bg-gray-100">
//         <p>Active Filters: {JSON.stringify(filters)}</p>
//         <p>Sort: {sort}</p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Filters */}
//         <aside className="w-full md:w-64 space-y-4">
//           {Object.entries(filterOptions).map(([sectionId, options]) => (
//             <div key={sectionId} className="p-4 border-b">
//               <h3 className="font-bold mb-3">{sectionId.toUpperCase()}</h3>
//               <div className="grid gap-2">
//                 {options.map((option) => (
//                   <Label 
//                     key={option.id}
//                     className="flex items-center gap-2"
//                   >
//                     <Checkbox
//                       checked={filters[sectionId]?.includes(option.id) || false}
//                       onCheckedChange={() => handleFilterChange(sectionId, option)}
//                     />
//                     {option.label}
//                   </Label>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1">
//           <div className="flex justify-end mb-4 gap-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="gap-2">
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   Sort By
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
//                   {sortOptions.map((option) => (
//                     <DropdownMenuRadioItem key={option.id} value={option.id}>
//                       {option.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
            
//             <span className="text-sm font-bold">
//               {studentViewCoursesList.length} Results
//             </span>
//           </div>

//           {/* Course List */}
//           <div className="space-y-4">
//             {loadingState ? (
//               <Skeleton className="h-32" />
//             ) : studentViewCoursesList.length > 0 ? (
//               studentViewCoursesList.map((course) => (
//                 <Card key={course._id} className="cursor-pointer">
//                   <CardContent className="flex gap-4 p-4">
//                     <div className="w-48 h-32 flex-shrink-0">
//                       <img
//                         src={course.image}
//                         alt={course.title}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <CardTitle className="text-xl mb-2">
//                         {course.title}
//                       </CardTitle>
//                       <p className="text-sm text-gray-600 mb-1">
//                         Created By{" "}
//                         <span className="font-bold">{course.instructorName}</span>
//                       </p>
//                       <p className="text-gray-600 mt-3 mb-2">
//                         {`${course.curriculum?.length || 0} ${
//                           course.curriculum?.length === 1 ? "Lecture" : "Lectures"
//                         } - ${course.level.toUpperCase()} Level`}
//                       </p>
//                       <p className="font-bold text-lg">
//                         ${course.pricing}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold">No Courses Found</h2>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default StudentCourse;