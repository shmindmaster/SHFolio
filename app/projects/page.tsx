"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FiExternalLink, FiGithub, FiGlobe, FiX } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { getProjectsData } from "@/lib/data"
import { cn } from "@/lib/utils"

type FilterType = "All" | string

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All")
  const projects = getProjectsData()

  // Get unique technologies across all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  )

  const filteredProjects = projects.filter((project) =>
    selectedFilter === "All"
      ? true
      : project.technologies.includes(selectedFilter)
  )

  return (
    <div className="container py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Featured Projects
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter("All")}
          >
            All
          </Button>
          {allTechnologies.map((tech) => (
            <Button
              key={tech}
              variant={selectedFilter === tech ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(tech)}
            >
              {tech}
            </Button>
          ))}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <Card
                className={cn(
                  "overflow-hidden h-full transition-all duration-300 hover:shadow-lg cursor-pointer",
                  "transform hover:-translate-y-1"
                )}
                onClick={() => setSelectedProject(project)}
              >
                <motion.div 
                  className="h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedProject?.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSelectedProject(null)}
            >
              <FiX className="h-4 w-4" />
            </Button>
          </DialogHeader>
          {selectedProject && (
            <div className="mt-4">
              <div
                className="w-full h-64 bg-cover bg-center rounded-lg mb-6"
                style={{ backgroundImage: `url(${selectedProject.image})` }}
              />
              <p className="text-muted-foreground mb-6">
                {selectedProject.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {selectedProject.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.links.case_study && (
                  <Button asChild variant="outline">
                    <Link href={selectedProject.links.case_study} target="_blank">
                      <FiExternalLink className="mr-2 h-4 w-4" />
                      Case Study
                    </Link>
                  </Button>
                )}
                {selectedProject.links.demo && (
                  <Button asChild variant="outline">
                    <Link href={selectedProject.links.demo} target="_blank">
                      <FiGlobe className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                {selectedProject.links.github && (
                  <Button asChild variant="outline">
                    <Link href={selectedProject.links.github} target="_blank">
                      <FiGithub className="mr-2 h-4 w-4" />
                      Source Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}