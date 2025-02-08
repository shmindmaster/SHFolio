"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialProps {
  name: string
  role: string
  company: string
  content: string
  image: string
}

export function Testimonial({ name, role, company, content, image }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full flex flex-col">
        <div className="mb-4">
          <Quote className="h-8 w-8 text-primary opacity-50" />
        </div>
        <p className="text-muted-foreground flex-grow mb-6">{content}</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">
              {role} at {company}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}