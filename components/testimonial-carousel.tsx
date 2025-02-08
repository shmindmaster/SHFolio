"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"
import type { Testimonial } from "@/lib/data"

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Double the testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
    >
      <motion.div
        className="flex gap-6"
        initial={{ x: 0 }}
        animate={{ x: `-${100}%` }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card 
            key={`${testimonial.id}-${index}`} 
            className="p-6 flex-shrink-0 w-[350px]"
          >
            <div className="mb-4">
              <Quote className="h-8 w-8 text-primary opacity-50" />
            </div>
            <p className="text-muted-foreground mb-6 line-clamp-4">
              {testimonial.content}
            </p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}