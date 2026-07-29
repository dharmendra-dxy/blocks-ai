import type { ReactNode } from "react"

export interface DialogAction {
  label: string
  onClick: () => void
  variant?: "default" | "secondary" | "destructive" | "ghost" | "outline"
  disabled?: boolean
}

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  primaryAction?: DialogAction
  secondaryAction?: DialogAction
}
