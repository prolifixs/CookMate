# CookMate Layout Structure Documentation

## Project Layout Structure

cookmate/
└── src/
├── app/
│ ├── components/
│ │ └── layouts/
│ │ ├── index.ts
│ │ ├── MainLayout.tsx
│ │ ├── Sidebar.tsx
│ │ └── Footer.tsx
│ ├── constants/
│ │ └── styles.ts
│ ├── types/
│ │ └── layout.ts
│ └── [page-name]/
│ └── page.tsx


## Core Components

### MainLayout (`src/app/components/layouts/MainLayout.tsx`)
typescript
type MainLayoutProps = {
children: ReactNode; // Main content
sidebar?: ReactNode; // Optional sidebar
footer?: ReactNode; // Optional footer
};

Primary container component that structures the entire page layout.

### Sidebar (`src/app/components/layouts/Sidebar.tsx`)
Navigation component that appears on the left side of the layout.

### Footer (`src/app/components/layouts/Footer.tsx`)
Bottom section component with search functionality.

## Shared Styles (`src/app/constants/styles.ts`)

typescript
export const layoutStyles = {
sidebar: "w-64 bg-white p-4 border-r flex flex-col",
mainContent: "flex-1 flex flex-col",
footer: "bg-white p-4 border-t",
} as const;


## Usage Example

typescript
"use client"
import { MainLayout, Sidebar, Footer } from "@/app/components/layouts";
export default function Page() {
return (
<MainLayout
sidebar={
<Sidebar>
<h2 className="text-2xl font-bold mb-4">Section Title</h2>
<nav className="space-y-2">
{/ Navigation items /}
</nav>
</Sidebar>
}
footer={<Footer />}
>
<main className="flex-1 p-6">
{/ Main content /}
</main>
</MainLayout>
);
}


## Common Patterns

### Main Content Structure

typescript
<main className="flex-1 p-6">
<div className="max-w-2xl mx-auto">
<div className="bg-white rounded-lg shadow">
{/ Content sections /}
</div>
</div>
</main>


### Sidebar Navigation

typescript
<Sidebar>
<h2 className="text-2xl font-bold mb-4">Section Title</h2>
<nav className="space-y-2">
<a href="#" className="block p-2 hover:bg-gray-100 rounded">Link 1</a>
<a href="#" className="block p-2 hover:bg-gray-100 rounded">Link 2</a>
</nav>
</Sidebar>


## Implementation Guidelines

1. **New Pages**
   - Create new page directory under `src/app/`
   - Use MainLayout as the root component
   - Include Sidebar and Footer as needed

2. **Styling**
   - Use provided layoutStyles from constants
   - Follow Tailwind CSS patterns
   - Maintain consistent spacing

3. **TypeScript**
   - Use proper type definitions
   - Import types from `@/app/types/layout`

## Current Pages
- `/profile`
- `/grocery-list`
- `/grocery-order`
- `/meal-recipe-description`

## Best Practices
1. Always use MainLayout for page structure
2. Keep navigation consistent across pages
3. Maintain responsive design principles
4. Follow established component hierarchy
