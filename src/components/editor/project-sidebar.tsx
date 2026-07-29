"use client"

import { FolderOpen, MoreHorizontal, Plus, Pencil, Trash2, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/project"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onNewProject: () => void
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwner)
  const sharedProjects = projects.filter((p) => !p.isOwner)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-sidebar-border bg-sidebar shadow-lg transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <h2 className="text-sm font-semibold text-sidebar-foreground">
            Projects
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="my-projects">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                <FolderOpen className="h-4 w-4" />
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                <Users className="h-4 w-4" />
                Shared
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-projects" className="mt-4">
              {ownedProjects.length === 0 ? (
                <EmptyState
                  icon={FolderOpen}
                  title="No projects yet"
                  description="Create your first project to get started."
                />
              ) : (
                <div className="flex flex-col gap-1">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRename}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared" className="mt-4">
              {sharedProjects.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No shared projects"
                  description="Projects shared with you will appear here."
                />
              ) : (
                <div className="flex flex-col gap-1">
                  {sharedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground"
                    >
                      <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{project.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <footer className="border-t border-sidebar-border p-4">
          <Button className="w-full" size="lg" onClick={onNewProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </footer>
      </aside>
    </>
  )
}

interface ProjectItemProps {
  project: Project
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  return (
    <div className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-sidebar-accent">
      <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate text-sm text-sidebar-foreground">
        {project.name}
      </span>
      {project.isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="opacity-0 group-hover:opacity-100"
              />
            }
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onClick={() => onRename(project)}>
              <Pencil className="h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(project)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-3 rounded-full bg-sidebar-accent p-3">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-sm font-medium text-sidebar-foreground">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
