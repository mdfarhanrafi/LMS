'use client'
import React from 'react'
import { Card,CardContent,CardTitle,CardHeader} from '@/components/ui/card'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Upload } from "lucide-react";
import { useContext,useRef } from 'react';
import MediaProgressbar from '@/components/media_progress_bar/media_progress';
import { InstructorContext } from '@/context/instructor_context/instructorContext';
import { courseCurriculumInitialFormData } from '@/lib/config/data';
import { Switch } from '@/components/ui/switch';
import { mediaUpload,mediaDelete,mediaBulkUpload } from '@/actions/course/courseCurriculam';
import VideoPlayer from '@/components/video_player';

const CourseCurriculam = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);
  
  const bulkUploadInputRef = useRef(null)

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }
  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function isCourseCurriculumFormDataValid(){
      return courseCurriculumFormData.every((item) => {
        return (
          item &&
          typeof item === "object" &&
          item.title.trim() !== "" &&
          item.videoUrl.trim() !== ""
        );
      });
  }

  async function handleSingleLectureUpload(event,currentIndex) {
             const selectedFile =  event.target.files[0];
             if(selectedFile){
              const videoFormData = new FormData();
              videoFormData.append('file',selectedFile)
             
             try {
                setMediaUploadProgress(true)
                const response = await mediaUpload(
                  videoFormData,
                  setMediaUploadProgressPercentage
                );
                if (response.success) {
                  let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
                  cpyCourseCurriculumFormData[currentIndex] = {
                    ...cpyCourseCurriculumFormData[currentIndex],
                    videoUrl: response?.data?.url,
                    public_id: response?.data?.public_id,
                  };
                  setCourseCurriculumFormData(cpyCourseCurriculumFormData);
                  setMediaUploadProgress(false);
                }
              
             } catch (error) {
                console.log(error)
             }
            }
 

  }
   
  async function handleReplaceVideo(currentIndex) {
        let cpyCourseCurriculumFormData=[...courseCurriculumFormData]
        const getCurrentVideoPublicId = cpyCourseCurriculumFormData[currentIndex].public_id;
        
        const deleteCurrentMedia= await mediaDelete(getCurrentVideoPublicId)
        if(deleteCurrentMedia?.success){
          cpyCourseCurriculumFormData[currentIndex]={
            ...courseCurriculumFormData[currentIndex],
            videoUrl:"",
            public_id:"",
          }
          setCourseCurriculumFormData(cpyCourseCurriculumFormData)  
        }
       
  }
  
  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDelete(getCurrentSelectedVideoPublicId);
    
    if(response?.success){
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

  }
  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }
  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUpload(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      console.log(response, "bulk");
      if (response?.success) {
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
          })),
        ];
        setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <Card>
    <CardHeader className="flex flex-row justify-between">
      <CardTitle>Create Course Curriculum</CardTitle>
      <div>
        <Input
          type="file"
          ref={bulkUploadInputRef}
          accept="video/*"
          multiple
          className="hidden"
          id="bulk-media-upload"
          onChange={handleMediaBulkUpload}
        />
        <Button
          as="label"
          htmlFor="bulk-media-upload"
          variant="outline"
          className="cursor-pointer"
          onClick={handleOpenBulkUploadDialog}
        >
          <Upload className="w-4 h-5 mr-2" />
          Bulk Upload
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <Button
        disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
        onClick={handleNewLecture}
      >
        Add Lecture
      </Button>
      {mediaUploadProgress ? (
        <MediaProgressbar
          isMediaUploading={mediaUploadProgress}
          progress={mediaUploadProgressPercentage}
        />
      ) : null}
      <div className="mt-4 space-y-4">
        {courseCurriculumFormData.map((curriculumItem, index) => (
          <div className="border p-5 rounded-md" key={index}>
            <div className="flex gap-5 items-center">
              <h3 className="font-semibold">Lecture {index + 1}</h3>
              <Input
                name={`title-${index + 1}`}
                placeholder="Enter lecture title"
                className="max-w-96"
                onChange={(event) => handleCourseTitleChange(event, index)}
                value={courseCurriculumFormData[index]?.title}
              />
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={(value) =>
                    handleFreePreviewChange(value, index)
                  }
                  checked={courseCurriculumFormData[index]?.freePreview}
                  id={`freePreview-${index + 1}`}
                />
                <Label htmlFor={`freePreview-${index + 1}`}>
                  Free Preview
                </Label>
              </div>
            </div>
            <div className="mt-6">
              {courseCurriculumFormData[index]?.videoUrl ? (
                <div className="flex gap-3">
                  <VideoPlayer
                    url={courseCurriculumFormData[index]?.videoUrl}
                    width="450px"
                    height="200px"
                  />
                  <Button onClick={() => handleReplaceVideo(index)}>
                    Replace Video
                  </Button>
                  <Button
                    onClick={() => handleDeleteLecture(index)}
                    className="bg-red-900"
                  >
                    Delete Lecture
                  </Button>
                </div>
              ) : (
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) =>
                    handleSingleLectureUpload(event, index)
                  }
                  className="mb-4"
                />
              )}
            </div>
            

          </div>
            
      
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default CourseCurriculam