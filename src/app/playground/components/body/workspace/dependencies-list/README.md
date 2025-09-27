# Dependencies List Components

This directory contains the separated components for the dependencies list functionality.

## Component Structure

### Main Component

- **`dependencies-list.tsx`** - Main container component that orchestrates all sub-components

### Sub-Components

- **`components/dependency-item.tsx`** - Individual dependency display with actions
- **`components/add-package-form.tsx`** - Form for adding new packages
- **`components/dependency-tabs.tsx`** - Tab navigation (Used, CDN, Suggested)
- **`components/dependency-content.tsx`** - Content area for each tab
- **`components/index.ts`** - Barrel export for all components

## Component Responsibilities

### DependenciesList (Main)

- Manages overall state (active tab, form visibility, package installation)
- Handles package installation and uninstallation
- Orchestrates communication between sub-components

### DependencyItem

- Displays individual dependency information
- Shows import type icons (CDN, Global, Module)
- Handles npm link and uninstall actions
- Configurable action visibility

### AddPackageForm

- Manages package name input
- Handles form submission and cancellation
- Auto-focus and keyboard shortcuts (Enter/Escape)
- Loading states during installation

### DependencyTabs

- Tab navigation between Used, CDN, and Suggested
- Displays counts for each tab
- Active tab styling and transitions

### DependencyContent

- Renders appropriate content based on active tab
- Empty states for unused dependencies
- Different layouts for each tab type
- Handles suggested package addition

## Benefits of Separation

1. **Maintainability** - Each component has a single responsibility
2. **Reusability** - Components can be used independently
3. **Testability** - Easier to unit test individual components
4. **Readability** - Smaller, focused components are easier to understand
5. **Performance** - Better optimization opportunities with smaller components

## Usage

```tsx
import { DependenciesList } from "./dependencies-list";

// The main component handles all sub-component orchestration
<DependenciesList />;
```

## Props Flow

```
DependenciesList
├── AddPackageForm (packageName, isInstalling, handlers)
├── DependencyTabs (activeTab, counts, onTabChange)
└── DependencyContent (activeTab, data, handlers)
    └── DependencyItem[] (dependency, actions)
```
