"use client"

import { createContext, useContext } from "react"

import { ProjectDialog } from "@/components/editor/project-dialog"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

type ProjectDialogsContextType = ReturnType<typeof useProjectDialogs>

const ProjectDialogsContext = createContext<ProjectDialogsContextType | null>(
  null,
)

export function useProjectDialogsContext() {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) {
    throw new Error(
      "useProjectDialogsContext must be used within ProjectDialogsProvider",
    )
  }
  return ctx
}

export function ProjectDialogsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const dialogs = useProjectDialogs()
  const isDialogOpen = dialogs.dialogMode !== null

  return (
    <ProjectDialogsContext.Provider value={dialogs}>
      {children}

      <ProjectDialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && dialogs.closeDialog()}
        mode={dialogs.dialogMode ?? "create"}
        projectName={dialogs.projectName}
        onProjectNameChange={dialogs.setProjectName}
        slug={dialogs.slug}
        currentName={dialogs.activeProject?.name ?? ""}
        isLoading={dialogs.isLoading}
        onSubmit={
          dialogs.dialogMode === "create"
            ? dialogs.handleCreate
            : dialogs.handleRename
        }
        onConfirm={dialogs.handleDelete}
      />
    </ProjectDialogsContext.Provider>
  )
}
