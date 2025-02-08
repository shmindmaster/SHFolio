"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = (timestamp - startTimestamp) / (duration * 1000)

        if (progress < 1) {
          setCount(Math.floor(end * progress))
          requestAnimationFrame(step)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(step)
      controls.start({
        scale: [0.5, 1],
        opacity: [0, 1],
        transition: { duration: 0.5 }
      })
    }
  }, [isInView, end, duration, controls])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ scale: 0.5, opacity: 0 }}
      className={className}
    >
      <Card className="p-6 h-full bg-gradient-to-br from-background to-muted hover:shadow-lg transition-all duration-300">
        <div className="text-center space-y-2">
          <div className="text-4xl md:text-5xl font-bold text-primary">
            {prefix}
            {count}
            {suffix}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium">
            {label}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}