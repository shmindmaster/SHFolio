import { cn } from "@/lib/utils"

interface TimelineItemProps {
  title: string
  company: string
  date: string
  logo?: string
  children?: React.ReactNode
}

export function TimelineItem({ title, company, date, logo, children }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      
      {/* Timeline dot */}
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
      
      {/* Content */}
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="flex items-center gap-4 mb-4">
          {logo && (
            <div className="w-12 h-12 rounded-full overflow-hidden border flex-shrink-0">
              <img src={logo} alt={company} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{company}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}