"use client"

import { useCallback, useState } from "react"

import type { Project } from "@/types/project"

const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "My First Project", slug: "my-first-project", isOwner: true },
  { id: "2", name: "Design System", slug: "design-system", isOwner: true },
  { id: "3", name: "Team Workspace", slug: "team-workspace", isOwner: false },
]

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [dialogMode, setDialogMode] = useState<"create" | "rename" | "delete" | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [projectName, setProjectName] = useState("")

  const slug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  const openCreate = useCallback(() => {
    setProjectName("")
    setDialogMode("create")
  }, [])

  const openRename = useCallback((project: Project) => {
    setActiveProject(project)
    setProjectName(project.name)
    setDialogMode("rename")
  }, [])

  const openDelete = useCallback((project: Project) => {
    setActiveProject(project)
    setDialogMode("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setDialogMode(null)
    setActiveProject(null)
    setProjectName("")
    setIsLoading(false)
  }, [])

  const handleCreate = useCallback(async () => {
    if (!projectName.trim()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newProject: Project = {
      id: String(Date.now()),
      name: projectName.trim(),
      slug,
      isOwner: true,
    }
    setProjects((prev) => [...prev, newProject])
    setIsLoading(false)
    closeDialog()
  }, [projectName, slug, closeDialog])

  const handleRename = useCallback(async () => {
    if (!activeProject || !projectName.trim()) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? { ...p, name: projectName.trim(), slug }
          : p,
      ),
    )
    setIsLoading(false)
    closeDialog()
  }, [activeProject, projectName, slug, closeDialog])

  const handleDelete = useCallback(async () => {
    if (!activeProject) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setProjects((prev) => prev.filter((p) => p.id !== activeProject.id))
    setIsLoading(false)
    closeDialog()
  }, [activeProject, closeDialog])

  return {
    projects,
    dialogMode,
    activeProject,
    isLoading,
    projectName,
    setProjectName,
    slug,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
