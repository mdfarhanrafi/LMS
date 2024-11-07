'use server'
import { z } from 'zod'

const CourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  level: z.string().min(1, 'Level is required'),
  language: z.string().min(1, 'Language is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  pricing: z.string().optional(),
  objectives: z.string().optional(),
})

export async function createCourse(prevState,formData) {
  const validatedFields = CourseSchema.safeParse({
    title: formData.get('title'),
    category: formData.get('category'),
    level: formData.get('level'),
    language: formData.get('language'),
    subtitle: formData.get('subtitle'),
    description: formData.get('description'),
    pricing: formData.get('pricing'),
    objectives: formData.get('objectives'),
    image:formData
  })

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid form data' }
  }

  const { data } = validatedFields

  try {
    // Here you would typically save the course data to your database
    // For this example, we'll just log it and return a success message
    console.log('Course data:', data)

    // Simulate a delay to mimic database operation
    await new Promise(resolve => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to create course' }
  }
}