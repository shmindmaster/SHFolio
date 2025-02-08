"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import emailjs from '@emailjs/browser'
import { Label } from "@/components/ui/label"
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter } from "react-icons/fi"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactData, setContactData] = useState<any>(null)

  useEffect(() => {
    const data = require('@/data/contact.json')
    setContactData(data)

    // Initialize EmailJS with your public key
    emailjs.init("6AENMLek8kBSUdKiU")
  }, [])

  if (!contactData) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot check
    if (formData.get('website')) {
      console.warn('Bot detected.')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await emailjs.send(
        "service_n8zcjkf",
        "template_sdybj8b",
        {
          from_name: formData.get('name'),
          from_email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          to_name: "Sarosh Hussain",
        }
      )

      toast({
        title: "Thank you for your message!",
        description: "We appreciate your feedback. Your message has been sent successfully.",
      })
      form.reset()
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-8">{contactData.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field */}
            <div className="hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                className="min-h-[150px]"
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiMail className="h-5 w-5 mr-3 text-muted-foreground" />
                <a href={`mailto:${contactData.contactInfo.email}`} className="text-muted-foreground hover:text-foreground">
                  {contactData.contactInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <FiPhone className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-muted-foreground">{contactData.contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-muted-foreground">{contactData.contactInfo.location}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a href={contactData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FiLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={contactData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={contactData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FiTwitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Office Hours</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>{contactData.officeHours.weekdays}</p>
              <p>{contactData.officeHours.availability}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}