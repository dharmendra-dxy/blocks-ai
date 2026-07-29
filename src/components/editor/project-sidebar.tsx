"use client";

import { FolderOpen, Plus, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
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
              <EmptyState
                icon={FolderOpen}
                title="No projects yet"
                description="Create your first project to get started."
              />
            </TabsContent>

            <TabsContent value="shared" className="mt-4">
              <EmptyState
                icon={Users}
                title="No shared projects"
                description="Projects shared with you will appear here."
              />
            </TabsContent>
          </Tabs>
        </div>

        <footer className="border-t border-sidebar-border p-4">
          <Button className="w-full" size="lg">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </footer>
      </aside>
    </>
  );
}

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
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
  );
}
