export interface Project {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export type ProjectDialogMode = "create" | "rename" | "delete"

export interface ProjectDialogState {
  mode: ProjectDialogMode | null
  project: Project | null
}
