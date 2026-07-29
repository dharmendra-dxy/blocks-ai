# UI Context

## Theme

**Light mode only.** Do not implement or design for dark mode.

The application follows the default shadcn/ui design system using the design tokens defined in `globals.css`. Components should rely exclusively on semantic Tailwind utilities backed by CSS variables.

Use semantic utility classes such as:

- `bg-background`
- `bg-card`
- `bg-popover`
- `text-foreground`
- `text-muted-foreground`
- `bg-primary`
- `text-primary-foreground`
- `bg-secondary`
- `bg-muted`
- `bg-accent`
- `text-accent-foreground`
- `border-border`
- `ring-ring`
- `bg-destructive`

Do **not**:

- Define custom color palettes.
- Hardcode hex values.
- Use arbitrary colors (`bg-[#...]`, `text-[#...]`).
- Use Tailwind colour scales (`zinc-*`, `gray-*`, `slate-*`, etc.) unless absolutely necessary.

All colours must come from the tokens defined in `globals.css`.

---

## Color System

The design system is entirely driven by the CSS variables declared in `globals.css`.

Primary semantic tokens include:

| Purpose | Token |
|---------|-------|
| Page background | `background` |
| Foreground text | `foreground` |
| Card surface | `card` |
| Popover | `popover` |
| Primary actions | `primary` |
| Secondary surfaces | `secondary` |
| Muted surfaces | `muted` |
| Accent states | `accent` |
| Borders | `border` |
| Inputs | `input` |
| Focus rings | `ring` |
| Destructive actions | `destructive` |

Whenever possible, use semantic utilities instead of referencing colours directly.

---

## Typography

| Role | Variable |
|------|----------|
| Sans | `--font-sans` |
| Mono | `--font-geist-mono` |

The application uses the default sans font throughout the UI. Use the mono font only for code snippets, IDs and technical values.

---

## Border Radius

Border radius comes directly from the global design tokens.

Prefer the following semantic sizes:

| Usage | Class |
|--------|------|
| Inputs & buttons | `rounded-md` |
| Cards | `rounded-lg` |
| Dialogs | `rounded-xl` |
| Large feature panels | `rounded-2xl` |

Avoid excessive rounding unless it improves usability.

---

## Canvas

### Node Style

Canvas nodes should follow the application's light theme.

- Background: `bg-card`
- Border: `border-border`
- Text: `text-foreground`
- Selected state: use `ring-ring`
- Hover state: use `bg-accent`

Avoid colourful node backgrounds unless they communicate a specific meaning.

### Edge Style

- Thin stroke
- Neutral border colour
- Smooth-step edges
- Arrow marker enabled

Edges should remain visually secondary to nodes.

### Node Shapes

Supported node shapes:

- Rectangle
- Diamond
- Circle
- Pill
- Cylinder
- Hexagon

Complex shapes should continue to be rendered using SVG.

### Connection Handles

Small circular handles using the application's primary colour.

Visible on hover.

### Canvas Background

Use the application background (`bg-background`) with the default React Flow background grid.

---

## Component Library

Use **shadcn/ui** components whenever possible.

Components should:

- Use semantic Tailwind classes.
- Respect the global CSS variables.
- Avoid introducing custom component styling unless required by functionality.

If a component is missing, add it through the shadcn CLI before creating a custom implementation.

---

## Layout Patterns

### Workspace

- Clean light background
- Floating panels should use `bg-card`
- Borders use `border-border`
- Comfortable whitespace over heavy visual separation

### Sidebar

- `bg-sidebar`
- `text-sidebar-foreground`
- `border-sidebar-border`

Use sidebar semantic tokens instead of standard card colours.

### Dialogs

- `bg-card`
- `border-border`
- `rounded-xl`
- Subtle shadow

### Navbar

- `bg-background`
- Bottom border using `border-border`
- Minimal elevation

---

## Icons

Use **Lucide React** exclusively.

Recommended sizes:

- Inline: `h-4 w-4`
- Buttons: `h-5 w-5`
- Empty states: `h-8 w-8`

Prefer outline icons over filled variants.

---

## Design Principles

- Light-first interface.
- Clean, spacious layouts.
- Semantic colours only.
- Consistent spacing.
- Minimal visual noise.
- Accessible contrast.
- Reuse shadcn components whenever possible.
- Follow the tokens defined in `globals.css` rather than introducing new design variables.