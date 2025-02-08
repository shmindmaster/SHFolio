import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'
import testimonialsData from '@/data/testimonials.json'

export type WorkExperience = {
  id: number
  title: string
  company: string
  location: string
  date: string
  logo: string
  description: string
  achievements: string[]
  technologies: string[]
}

export type Education = {
  id: number
  degree: string
  institution: string
  period: string
  description: string
  specializations: string[]
}

export type Certification = {
  id: number
  name: string
  issuer: string
  year: string
}

export type Project = {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  links: {
    case_study?: string
    demo?: string
    github?: string
  }
}

export type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  content: string
  image: string
}

export function getExperienceData() {
  return {
    workExperience: experienceData.workExperience as WorkExperience[],
    education: experienceData.education as Education[],
    certifications: experienceData.certifications as Certification[]
  }
}

export function getProjectsData() {
  return projectsData.projects as Project[]
}

export function getTestimonialsData() {
  return testimonialsData.testimonials as Testimonial[]
}