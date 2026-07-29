# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 3: Project Dialogs

## Current Goal

- Build the editor home screen and add project dialogs/sidebar actions (create, rename, delete). No API calls or persistence yet — mock data only.

## Completed

- Editor navbar (`components/editor/editor-navbar.tsx`) — fixed-height top navbar with sidebar toggle using `PanelLeftOpen`/`PanelLeftClose` icons.
- Project sidebar (`components/editor/project-sidebar.tsx`) — floating sidebar that slides from left, with `Projects` header, `My Projects`/`Shared` tabs, empty placeholder states, and full-width `New Project` button.
- Editor layout integration (`app/editor/layout.tsx`) — integrated navbar and sidebar with state management.
- Editor page (`app/editor/page.tsx`) — workspace canvas placeholder.
- Clerk auth integration — `ClerkProvider` with `dark` theme wrapping root layout, appearance variables mapped to app CSS variables.
- Sign-in page (`app/sign-in/page.tsx`) — two-panel layout (left: logo/tagline/features, right: Clerk `SignIn`); form-only on small screens.
- Sign-up page (`app/sign-up/page.tsx`) — same two-panel layout with Clerk `SignUp`.
- Auth layout shell (`components/auth/auth-layout-shell.tsx`) — shared two-panel layout for auth pages.
- Route protection (`proxy.ts`) — `clerkMiddleware` with `createRouteMatcher`; `/sign-in` and `/sign-up` are public, everything else protected.
- Home page (`app/page.tsx`) — authenticated users redirect to `/editor`, unauthenticated to `/sign-in`.
- UserButton added to editor navbar right section for profile/logout.
- Editor home screen (`app/editor/page.tsx`) — center content with heading, description, and `New Project` button that opens the Create dialog.
- Project types (`src/types/project.ts`) — `Project`, `ProjectDialogMode`, and `ProjectDialogState` interfaces.
- `useProjectDialogs` hook (`src/hooks/use-project-dialogs.ts`) — manages dialog state, form state, loading state, and mock project data.
- Single `ProjectDialog` component (`components/editor/project-dialog.tsx`) — unified dialog handling create, rename, and delete modes with discriminated union props.
- `ProjectDialogsProvider` (`components/editor/project-dialogs-provider.tsx`) — context provider for sharing dialog state across layout and page.
- Sidebar project actions — rename/delete dropdown menu for owned projects only; hidden for shared/collaborator projects.
- Mobile sidebar backdrop scrim with tap-outside-to-close (`md:hidden` breakpoint).

## In Progress

- None.

## Next Up

- Implement canvas workspace with React Flow
- Add API calls and persistence for project CRUD

## Open Questions

- Add unresolved product or implementation question here. 

## Architecture Decisions

- shadcn/ui over Tailwind v4 (CSS-based token config via @theme inline in globals.css, no tailwind.config.js).
- Light-only theme.
- Do not modify generated components/ui/* files after shadcn installation.
- Clerk `dark` theme used as base; appearance variables overridden with app CSS variables.
- Route protection via `proxy.ts` using `clerkMiddleware` + `createRouteMatcher`.
- Project dialogs use a context provider (`ProjectDialogsProvider`) to share dialog state between layout, sidebar, and page without prop drilling.
- Hooks belong in `src/hooks/`, types in `src/types/`.
- Single unified dialog component with discriminated union props instead of multiple dialog components per action.

## Session Notes

- Using Next.js 16.2.4 with React 19 and Tailwind CSS v4.
- shadcn version 4.5.0 was used; it auto-detected Tailwind v4.
- lucide-react ^1.11.0 installed as a direct dependency.
- @clerk/ui installed for Clerk dark theme.
- Clerk appearance uses `theme` (not `baseTheme`) property.
- Clerk variables: `colorForeground`, `colorInput`, `colorInputForeground` (not `colorText`, `colorInputBackground`, `colorInputText`).