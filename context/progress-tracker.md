# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 2: Authentication

## Current Goal

- Wire Clerk into the app: provider, auth pages, route protection, redirects, and user menu.

## Completed

- Editor navbar (`components/editor/editor-navbar.tsx`) — fixed-height top navbar with sidebar toggle using `PanelLeftOpen`/`PanelLeftClose` icons.
- Project sidebar (`components/editor/project-sidebar.tsx`) — floating sidebar that slides from left, with `Projects` header, `My Projects`/`Shared` tabs, empty placeholder states, and full-width `New Project` button.
- Dialog pattern types (`components/editor/dialog-types.ts`) — `DialogProps` and `DialogAction` interfaces ready for future dialog implementations.
- Editor layout integration (`app/editor/layout.tsx`) — integrated navbar and sidebar with state management.
- Editor page (`app/editor/page.tsx`) — workspace canvas placeholder.
- Clerk auth integration — `ClerkProvider` with `dark` theme wrapping root layout, appearance variables mapped to app CSS variables.
- Sign-in page (`app/sign-in/page.tsx`) — two-panel layout (left: logo/tagline/features, right: Clerk `SignIn`); form-only on small screens.
- Sign-up page (`app/sign-up/page.tsx`) — same two-panel layout with Clerk `SignUp`.
- Auth layout shell (`components/auth/auth-layout-shell.tsx`) — shared two-panel layout for auth pages.
- Route protection (`proxy.ts`) — `clerkMiddleware` with `createRouteMatcher`; `/sign-in` and `/sign-up` are public, everything else protected.
- Home page (`app/page.tsx`) — authenticated users redirect to `/editor`, unauthenticated to `/sign-in`.
- UserButton added to editor navbar right section for profile/logout.

## In Progress

- None.

## Next Up

- Add first functional dialog (e.g., new project dialog)
- Implement canvas workspace with React Flow

## Open Questions

- Add unresolved product or implementation question here. 

## Architecture Decisions

- shadcn/ui over Tailwind v4 (CSS-based token config via @theme inline in globals.css, no tailwind.config.js).
- Light-only theme.
- Do not modify generated components/ui/* files after shadcn installation.
- Clerk `dark` theme used as base; appearance variables overridden with app CSS variables.
- Route protection via `proxy.ts` using `clerkMiddleware` + `createRouteMatcher`.

## Session Notes

- Using Next.js 16.2.4 with React 19 and Tailwind CSS v4.
- shadcn version 4.5.0 was used; it auto-detected Tailwind v4.
- lucide-react ^1.11.0 installed as a direct dependency.
- @clerk/ui installed for Clerk dark theme.
- Clerk appearance uses `theme` (not `baseTheme`) property.
- Clerk variables: `colorForeground`, `colorInput`, `colorInputForeground` (not `colorText`, `colorInputBackground`, `colorInputText`).