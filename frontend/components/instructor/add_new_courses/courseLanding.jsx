"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle ,CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mediaUpload } from "@/actions/course/courseCurriculam";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  courseCategories,
  courseLandingInitialFormData,
  courseLevelOptions,
  languageOptions,
} from "@/lib/config/data";
import { useContext } from "react";
import {InstructorContext} from "@/context/instructor_context/instructorContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MediaProgressbar from "@/components/media_progress_bar/media_progress";


const CourseLanding = () => {
  const [title, setTitle] = useState("");
  const [category, setcategory] = useState("");
  const [level, setlevel] = useState("");
  const [language, setlanguage] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [description, setdescription] = useState("");
  const [pricing, setpricing] = useState("");
  const [objectives, setobjectives] = useState("");
  const [welcome, setwelcome] = useState("");
  const [image,setimage] = useState("")


  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  function handleFormSubmit(event){
    event.preventDefault()
    courseLandingInitialFormData.title = courseLandingFormData?.title === title? courseLandingFormData.title : title      
    courseLandingInitialFormData.category=courseLandingFormData?.category ===category  ? courseLandingFormData.category :category
    courseLandingInitialFormData.level=courseLandingFormData?.level === level ? courseLandingFormData.level :level
    courseLandingInitialFormData.primaryLanguage=courseLandingFormData?.primaryLanguage === language ? courseLandingFormData.primaryLanguage :language
    courseLandingInitialFormData.subtitle=courseLandingFormData?.subtitle === subtitle ? courseLandingFormData.subtitle :subtitle
    courseLandingInitialFormData.description=courseLandingFormData?.description === description ? courseLandingFormData.description : description 
    courseLandingInitialFormData.objectives=courseLandingFormData?.objectives === objectives ? courseLandingFormData.objectives :objectives 
    courseLandingInitialFormData.welcomeMessage=courseLandingFormData?.welcomeMessage === welcome ? courseLandingFormData.welcomeMessage :welcome
    courseLandingInitialFormData.pricing=courseLandingFormData.pricing == pricing ? courseLandingFormData.pricing :pricing 
    courseLandingInitialFormData.image=image
    setCourseLandingFormData(courseLandingInitialFormData)
  }
  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUpload(
          imageFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          setimage(response.data.url)
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
 


  return (
    <form onSubmit={handleFormSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label htmlFor="text">Title</Label>
            <Input
              type="text"
              id="text"
              placeholder={courseLandingFormData?.title ? courseLandingFormData?.title:"Enter course Title"}
              name="title"
              value={title} 
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </Label>
            <Select name="category" value={category} onValueChange={(value)=>setcategory(value)} required>
              <SelectTrigger>
                <SelectValue placeholder={courseLandingFormData?.category ? courseLandingFormData?.category:"Select category"} />
              </SelectTrigger>
              <SelectContent>
                {courseCategories.map((item, key) => (
                  <SelectItem key={item.id} value={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Level
            </Label>
            <Select name="level" onValueChange={(value)=>setlevel(value)} required>
              <SelectTrigger>
                <SelectValue placeholder={courseLandingFormData?.level ? courseLandingFormData?.level:"Select level"} />
              </SelectTrigger>
              <SelectContent>
                {courseLevelOptions.map((item, key) => (
                  <SelectItem key={item.id} value={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Primary Language
            </Label>
            <Select name="language" value={language} onValueChange={(value)=>setlanguage(value)} required>
              <SelectTrigger>
                <SelectValue placeholder={courseLandingFormData?.primaryLanguage ? courseLandingFormData?.primaryLanguage: "Select language"} />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((item, key) => (
                  <SelectItem key={item.id} value={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700"
            >
              Subtitle
            </Label>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder={courseLandingFormData?.subtitle ? courseLandingFormData?.subtitle: "Enter course subtitle"}
              value={subtitle}
              onChange={(e)=>setsubtitle(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={description}
              onChange={(e)=>setdescription(e.target.value)}
              placeholder={courseLandingFormData?.description ? courseLandingFormData?.description:"Enter course description"}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="pricing"
              className="block text-sm font-medium text-gray-700"
            >
              Pricing
            </Label>
            <Input
              id="pricing"
              name="pricing"
              placeholder={courseLandingFormData?.pricing ? courseLandingFormData?.pricing: "Enter course pricing"}
              value={pricing}
              onChange={(e)=>setpricing(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="objectives"
              className="block text-sm font-medium text-gray-700"
            >
              Objectives
            </Label>
            <Textarea
              id="objectives"
              name="objectives"
              placeholder={courseLandingFormData?.objectives ? courseLandingFormData?.objectives:"Enter course objectives"}
              value={objectives}
              onChange={(e)=>setobjectives(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 p-2">
            <Label
              htmlFor="welcome_message"
              className="block text-sm font-medium text-gray-700"
            >
              Welcome Message
            </Label>
            <Textarea
              id="welcome_message"
              name="welcome_message"
              value={welcome}
              onChange={(e)=>setwelcome(e.target.value)}
              placeholder={courseLandingFormData?.welcomeMessage ? courseLandingFormData?.welcomeMessage: "Enter course welcome_message"}
            />
          </div>
          
          {mediaUploadProgress ? (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}
 


          <div className="grid w-full items-center gap-3 p-2">
            <Label htmlFor="welcome_message"
              className="block text-sm font-medium text-gray-700">Upload Course Image</Label>
            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
              placeholder={courseLandingFormData?.image}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" className="text-sm tracking-wider font-bold px-8l">
            SUBMIT
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default CourseLanding;
