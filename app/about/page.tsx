"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FiUser, FiInfo } from "react-icons/fi"

const icons = {
  Brain: FiUser,
  Award: FiInfo,
  Briefcase: FiInfo
} as const

type IconType = keyof typeof icons

function SkillCard({
  icon,
  title,
  skills,
  level,
  index
}: {
  icon: IconType
  title: string
  skills: string[]
  level: number
  index: number
}) {
  const Icon = icons[icon]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center mb-4">
          <Icon className="h-6 w-6 mr-2 text-primary" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Expertise Level</span>
            <span className="font-medium">{level}%</span>
          </div>
          <Progress value={level} className="h-2" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

interface Competency {
  id: number
  title: string
  icon: IconType
  skills: string[]
  level: number
}

interface AboutData {
  summary: {
    name: string
    title: string
    description: string
    image: string
    stats: {
      yearsOfExperience: string
      projectsCompleted: string
      industriesWorked: string
    }
  }
  competencies: Competency[]
  philosophy: {
    title: string
    content: string
  }
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    const data = require('@/data/about.json')
    setAboutData(data)
  }, [])

  if (!aboutData) return null

  return (
    <div className="container py-12 px-4 md:px-6">
      {/* Profile Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
            <img
              src={aboutData.summary.image}
              alt={aboutData.summary.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{aboutData.summary.title}</h1>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground">
                {aboutData.summary.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">{aboutData.summary.stats.yearsOfExperience}</h3>
            <p className="text-muted-foreground">Years of Experience</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">{aboutData.summary.stats.projectsCompleted}</h3>
            <p className="text-muted-foreground">Projects Completed</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-primary mb-2">{aboutData.summary.stats.industriesWorked}</h3>
            <p className="text-muted-foreground">Industries Served</p>
          </Card>
        </div>
      </motion.section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutData.competencies.map((competency, index) => (
            <SkillCard
              key={competency.id}
              icon={competency.icon}
              title={competency.title}
              skills={competency.skills}
              level={competency.level}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Personal Statement */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="p-6 bg-muted/50">
          <h2 className="text-2xl font-semibold mb-4">{aboutData.philosophy.title}</h2>
          <p className="text-muted-foreground">
            {aboutData.philosophy.content}
          </p>
        </Card>
      </motion.section>
    </div>
  )
}