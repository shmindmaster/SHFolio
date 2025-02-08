"use client"

import { useState, useEffect } from "react"

export function Footer() {
  const [contactData, setContactData] = useState<any>(null)

  useEffect(() => {
    const data = require('@/data/contact.json')
    setContactData(data)
  }, [])

  if (!contactData) return null

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sarosh Hussain. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href={contactData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={contactData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={contactData.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}