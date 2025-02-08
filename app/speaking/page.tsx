"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Link as LinkIcon,
  Video,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { OptimizedImage } from "@/components/optimized-image";
import dynamic from 'next/dynamic';
import { FiList, FiCalendar, FiMapPin } from "react-icons/fi"

const Dialog = dynamic(
  () => import('@radix-ui/react-dialog').then(mod => mod.Root),
  { ssr: false }
);

const Tooltip = dynamic(
  () => import('@radix-ui/react-tooltip').then(mod => mod.Root),
  {
    ssr: false,
    loading: () => <div className="h-6 animate-pulse bg-muted rounded-md" />
  }
)

const TooltipTrigger = dynamic(
  () => import('@radix-ui/react-tooltip').then(mod => mod.Trigger),
  { ssr: false }
)

const TooltipContent = dynamic(
  () => import('@radix-ui/react-tooltip').then(mod => mod.Content),
  { ssr: false }
)

type ViewMode = "list" | "calendar"

interface Engagement {
  id: number
  title: string
  event: string
  date: string
  location: string
  description: string
  topics: string[]
  links?: {
    presentation: string
    video?: string
  }
  image?: string
}

const { engagements: speakingData }: { engagements: Engagement[] } = require('@/data/speaking.json'); // Corrected import

export default function SpeakingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [viewMode, setViewMode] = useState<ViewMode>("list")

  const filteredEngagements = selectedDate
    ? speakingData.filter(
        (engagement) => format(new Date(engagement.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    : speakingData

  // Get all dates with events for calendar highlighting
  const eventDates = speakingData.map(e => new Date(e.date))

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight mb-4 md:mb-0"
        >
          Speaking Engagements
        </motion.h1>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <FiList className="h-4 w-4 mr-2" />
            List View
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
          >
            <FiCalendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
        <TabsContent value="list" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Filter */}
            <Card className="p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold mb-4">Filter by Date</h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  event: eventDates
                }}
                modifiersStyles={{
                  event: {
                    fontWeight: 'bold',
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))'
                  }
                }}
              />
              {selectedDate && (
                <Button
                  variant="ghost"
                  className="mt-4 w-full"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear Selection
                </Button>
              )}
            </Card>

            {/* Engagements List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {filteredEngagements.length > 0 ? (
                  filteredEngagements.map((engagement, index) => (
                    <motion.div
                      key={engagement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 transition-all duration-300 hover:shadow-lg">
                        {engagement.image && (
                          <OptimizedImage
                            src={engagement.image}
                            alt={`${engagement.title} presentation`}
                            width={400}
                            height={225}
                            className="hover:opacity-90 mb-4"
                          />
                        )}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{engagement.title}</h3>
                            <p className="text-muted-foreground">{engagement.event}</p>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center">
                              <FiCalendar className="h-4 w-4 mr-2" />
                              <span>{format(new Date(engagement.date), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{format(new Date(engagement.date), "h:mm a")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-muted-foreground mb-4">
                          <FiMapPin className="h-4 w-4 mr-2" />
                          <span>{engagement.location}</span>
                        </div>

                        <p className="text-muted-foreground mb-4">{engagement.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {engagement.topics.map((topic) => (
                            <Badge key={topic} variant="secondary">{topic}</Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {engagement.links?.presentation && (
                            <Button asChild variant="outline" size="sm">
                              <Link href={engagement.links.presentation} target="_blank">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Presentation
                              </Link>
                            </Button>
                          )}
                          {engagement.links?.video && ( // Safe check
                            <Button asChild variant="outline" size="sm">
                              <Link href={engagement.links.video} target="_blank">
                                <Video className="mr-2 h-4 w-4" />
                                Video
                              </Link>
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card className="p-6">
                      <p className="text-center text-muted-foreground">
                        No speaking engagements found for the selected date.
                      </p>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {speakingData.map((engagement) => (
                <motion.div
                  key={engagement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <Card className={cn(
                    "p-4 h-full border-l-4",
                    new Date(engagement.date) > new Date()
                      ? "border-l-primary"
                      : "border-l-muted"
                  )}>
                    {engagement.image && (
                      <OptimizedImage
                        src={engagement.image}
                        alt={`${engagement.title} presentation`}
                        width={200}
                        height={112}
                        className="hover:opacity-90 mb-2"
                      />
                    )}
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <FiCalendar className="h-4 w-4 mr-2" />
                      <span>{format(new Date(engagement.date), "MMMM d, yyyy")}</span>
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-1">{engagement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{engagement.event}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <FiMapPin className="h-3 w-3 mr-1" />
                      <span className="line-clamp-1">{engagement.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {engagement.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {engagement.topics.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{engagement.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}