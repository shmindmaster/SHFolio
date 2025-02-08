import { toast as sonnerToast } from "sonner"

export function toast(props: {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}) {
  sonnerToast(props.title, {
    description: props.description,
    action: props.action
      ? {
          label: props.action.label,
          onClick: props.action.onClick,
        }
      : undefined,
  })
}