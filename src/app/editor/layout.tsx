"use client"

import { useState } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogsProvider, useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ProjectDialogsProvider>
      <div className="flex h-screen flex-col">
        <EditorNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="relative flex-1 overflow-hidden">
          <SidebarContent
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="h-full overflow-auto">{children}</main>
        </div>
      </div>
    </ProjectDialogsProvider>
  )
}

function SidebarContent({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const dialogs = useProjectDialogsContext()

  return (
    <ProjectSidebar
      isOpen={isOpen}
      onClose={onClose}
      projects={dialogs.projects}
      onNewProject={dialogs.openCreate}
      onRename={dialogs.openRename}
      onDelete={dialogs.openDelete}
    />
  )
}
