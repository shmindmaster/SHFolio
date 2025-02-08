"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiUser, FiCloud, FiCode, FiShield, FiDownload, FiMail } from "react-icons/fi"
import Link from "next/link"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/animated-counter"
import { Progress } from "@/components/ui/progress"
import type { Testimonial } from "@/lib/data"

const icons = {
  Brain: FiUser,
  Cloud: FiCloud,
  Code: FiCode,
  Shield: FiShield
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [homeData, setHomeData] = useState<any>(null)

  useEffect(() => {
    // Load data
    const testimonialsData = require('@/data/testimonials.json')
    const homeContent = require('@/data/home.json')
    setTestimonials(testimonialsData.testimonials)
    setHomeData(homeContent)
  }, [])

  if (!homeData) return null

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            {/* Professional Image */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary mb-4">
              <img
                src={homeData.hero.image}
                alt="Sarosh Hussain"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {homeData.hero.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {homeData.hero.subtitle}
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-5xl py-8">
              <AnimatedCounter
                end={20}
                label="Years Experience"
                suffix="+"
              />
              <AnimatedCounter
                end={50}
                label="Projects Completed"
                suffix="+"
              />
              <AnimatedCounter
                end={10}
                label="Industries Served"
                suffix="+"
              />
              <AnimatedCounter
                end={500}
                label="Budget Managed"
                prefix="$"
                suffix="M+"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href={homeData.hero.buttons.primary.link}>
                  {homeData.hero.buttons.primary.text}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={homeData.hero.buttons.secondary.link} target="_blank" rel="noopener noreferrer">
                  <FiDownload className="mr-2 h-4 w-4" />
                  {homeData.hero.buttons.secondary.text}
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={homeData.hero.buttons.tertiary.link}>
                  <FiMail className="mr-2 h-4 w-4" />
                  {homeData.hero.buttons.tertiary.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-6">About Me</h2>
            <p className="text-xl text-muted-foreground text-center max-w-[800px] mx-auto">
              {homeData.about.description}
            </p>
          </div>

          <Card className="p-6 bg-muted/50">
            <h3 className="text-2xl font-semibold mb-4">{homeData.about.philosophy.title}</h3>
            <p className="text-muted-foreground">
              {homeData.about.philosophy.content}
            </p>
          </Card>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            {homeData.expertise.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeData.expertise.areas.map((area: any) => {
              const Icon = icons[area.icon as keyof typeof icons]
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <Icon className="h-6 w-6 mr-2 text-primary" />
                      <h3 className="text-xl font-semibold">{area.title}</h3>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Expertise Level</span>
                        <span className="font-medium">{area.level}%</span>
                      </div>
                      <Progress value={area.level} className="h-2" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            What People Say
          </h2>
          {testimonials.length > 0 && (
            <TestimonialCarousel testimonials={testimonials} />
          )}
        </div>
      </section>
    </div>
  )
}