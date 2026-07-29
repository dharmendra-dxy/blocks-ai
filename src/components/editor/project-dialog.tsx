"use client";

import { useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProjectDialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

interface CreateModeProps extends ProjectDialogBaseProps {
  mode: "create";
  projectName: string;
  onProjectNameChange: (name: string) => void;
  slug: string;
  onSubmit: () => void;
}

interface RenameModeProps extends ProjectDialogBaseProps {
  mode: "rename";
  projectName: string;
  onProjectNameChange: (name: string) => void;
  currentName: string;
  onSubmit: () => void;
}

interface DeleteModeProps extends ProjectDialogBaseProps {
  mode: "delete";
  projectName: string;
  onConfirm: () => void;
  currentName: string;
}

interface CreateFormProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  slug: string;
  isLoading: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

interface RenameFormProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  projectName: string;
  onProjectNameChange: (name: string) => void;
  isLoading: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

type ProjectDialogProps = CreateModeProps | RenameModeProps | DeleteModeProps;

export function ProjectDialog(props: ProjectDialogProps) {
  const { open, onOpenChange, isLoading, mode } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && (mode === "create" || mode === "rename")) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (mode === "rename") {
          inputRef.current?.select();
        }
      }, 50);
    }
  }, [open, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const hasValidName =
        (mode === "create" || mode === "rename") && props.projectName.trim();
      if (hasValidName) {
        e.preventDefault();
        props.onSubmit();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle(mode)}</DialogTitle>
          <DialogDescription>{getDescription(mode, props)}</DialogDescription>
        </DialogHeader>

        {mode === "create" && (
          <CreateForm
            inputRef={inputRef}
            projectName={props.projectName}
            onProjectNameChange={props.onProjectNameChange}
            slug={props.slug}
            isLoading={isLoading}
            onKeyDown={handleKeyDown}
          />
        )}

        {mode === "rename" && (
          <RenameForm
            inputRef={inputRef}
            projectName={props.projectName}
            onProjectNameChange={props.onProjectNameChange}
            isLoading={isLoading}
            onKeyDown={handleKeyDown}
          />
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          {mode === "create" && (
            <Button
              onClick={props.onSubmit}
              disabled={!props.projectName.trim() || isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          )}
          {mode === "rename" && (
            <Button
              onClick={props.onSubmit}
              disabled={!props.projectName.trim() || isLoading}
            >
              {isLoading ? "Renaming..." : "Rename"}
            </Button>
          )}
          {mode === "delete" && (
            <Button
              variant="destructive"
              onClick={props.onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getTitle(mode: "create" | "rename" | "delete"): string {
  switch (mode) {
    case "create":
      return "Create Project";
    case "rename":
      return "Rename Project";
    case "delete":
      return "Delete Project";
  }
}

function getDescription(
  mode: "create" | "rename" | "delete",
  props: ProjectDialogProps,
): string {

  switch (mode) {
    case "create":
      return "Give your project a name to get started.";
    case "rename":
      return `Rename \u201C${(props as RenameModeProps).currentName}\u201D to a new name.`;
    case "delete":
      return `Are you sure you want to delete \u201C${(props as DeleteModeProps).currentName}\u201D? This action cannot be undone.`;
  }
}

function CreateForm({
  inputRef,
  projectName,
  onProjectNameChange,
  slug,
  isLoading,
  onKeyDown,
}: CreateFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="project-name">Project name</Label>
        <Input
          ref={inputRef}
          id="project-name"
          placeholder="My awesome project"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isLoading}
        />
      </div>

      {projectName && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Slug</span>
          <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">
            {slug || "\u2014"}
          </code>
        </div>
      )}
    </div>
  );
}

function RenameForm({
  inputRef,
  projectName,
  onProjectNameChange,
  isLoading,
  onKeyDown,
}: RenameFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="rename-project">Project name</Label>
      <Input
        ref={inputRef}
        id="rename-project"
        value={projectName}
        onChange={(e) => onProjectNameChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={isLoading}
      />
    </div>
  );
}
