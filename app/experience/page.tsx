"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { FiCalendar, FiBookOpen, FiAward } from "react-icons/fi"
import { FiBriefcase as FiBuilding } from "react-icons/fi"
import { motion } from "framer-motion"
import { getExperienceData } from "@/lib/data"

export default function ExperiencePage() {
  const { workExperience, education, certifications } = getExperienceData()

  return (
    <div className="container py-12 px-4 md:px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-8"
      >
        Professional Experience
      </motion.h1>
      
      {/* Work Experience */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiBuilding className="mr-2 h-6 w-6" />
          Work Experience
        </h2>
        <Timeline>
          {workExperience.map((experience) => (
            <TimelineItem
              key={experience.id}
              title={experience.title}
              company={experience.company}
              date={experience.date}
              logo={experience.logo}
            >
              <div className="mt-4 space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <FiCalendar className="h-4 w-4 mr-2" />
                  {experience.date}
                </div>
                <p className="text-muted-foreground">
                  {experience.description}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="pl-2">
                      <span className="ml-[-1.5rem]">•</span> {achievement}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </section>

      {/* Education & Certifications */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FiBookOpen className="mr-2 h-6 w-6" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <FiCalendar className="mr-2 h-4 w-4" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FiAward className="mr-2 h-6 w-6" />
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline">{cert.year}</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}