# File Explorer Components

This directory contains the file explorer functionality for the playground.

## Components

### Main Components

- **`file-explorer.tsx`** - Main file explorer container
- **`file-explorer-header.tsx`** - Header with title and add file button
- **`file-explorer-content.tsx`** - Content area with file tree

### Sub-Components

- **`header/add-file-btn.tsx`** - Button to add new files
- **`components/new-file-dialog.tsx`** - Dialog for creating new files
- **`components/index.ts`** - Barrel export for components

## New File Creation

### Supported File Types

The new file dialog supports the following file types with appropriate templates:

1. **React Component (.jsx)**

   - Basic React functional component template
   - Includes import statement and export

2. **TypeScript Component (.tsx)**

   - TypeScript React component with props interface
   - Type-safe component structure

3. **JavaScript (.js)**

   - Plain JavaScript utility file
   - Export function template

4. **TypeScript (.ts)**

   - TypeScript utility file
   - Type-safe function template

5. **CSS (.css)**

   - CSS stylesheet with class template
   - Commented structure

6. **HTML (.html)**

   - Complete HTML document
   - Basic structure with meta tags

7. **JSON (.json)**

   - JSON configuration file
   - Basic package.json-like structure

8. **Markdown (.md)**
   - Markdown document
   - Header and description structure

### Features

- **File Type Selection**: Visual grid of file types with icons
- **Auto-completion**: File extension added automatically
- **Template Generation**: Appropriate starter code for each file type
- **Duplicate Prevention**: Checks for existing files
- **Auto-focus**: Input field focused when dialog opens
- **Keyboard Shortcuts**: Enter to create, Escape to cancel
- **Loading States**: Visual feedback during file creation

### Usage

1. Click the **+** button in the file explorer header
2. Enter a file name (extension will be added automatically)
3. Select the desired file type from the grid
4. Click "Create File" or press Enter
5. The new file will be created and automatically opened in the editor

### File Store Integration

The new file creation integrates with the `useFileStore`:

- **`addFile(filePath, content)`** - Creates new file with template content
- **`setActiveFile(filePath)`** - Automatically opens the new file
- **Duplicate checking** - Prevents overwriting existing files
- **Persistence** - Files are saved to localStorage

### Template System

Each file type has a predefined template that includes:

- Appropriate imports and exports
- Basic structure for the file type
- Placeholder content to get started
- Best practices for each language/framework

### Error Handling

- **Duplicate files**: Shows alert if file already exists
- **Invalid names**: Prevents creation of files with invalid characters
- **Network errors**: Graceful error handling with user feedback
- **Loading states**: Visual feedback during async operations
