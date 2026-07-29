"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"

export default function EditorPage() {
  const { openCreate } = useProjectDialogsContext()

  return (
    <div className="flex h-full items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Create a project or open an existing one
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button className="mt-6" size="lg" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  )
}
