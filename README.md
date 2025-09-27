# React Playground Editor

A comprehensive code editing playground component for React applications. This library provides a full-featured IDE-like experience with file management, code editing, live preview, terminal simulation, and dependency management.

## Features

- 🗂️ **File Management**: Create, edit, delete, and organize files
- ✏️ **Code Editing**: Monaco Editor with syntax highlighting and IntelliSense
- 🌐 **Live Preview**: Real-time rendering of React components
- 📦 **Dependency Management**: Automatic detection and CDN integration
- 🖥️ **Terminal Simulation**: Console output and network monitoring
- 🎨 **Dark Theme**: Consistent dark theme throughout
- ⌨️ **Keyboard Shortcuts**: Common IDE shortcuts
- 📱 **Responsive Design**: Works on different screen sizes

## Installation

```bash
npm install react-playground-editor
# or
yarn add react-playground-editor
# or
pnpm add react-playground-editor
```

## Usage

### Basic Usage

```tsx
import React from "react";
import { Playground } from "react-playground-editor";
import "react-playground-editor/dist/style.css";

function App() {
  return (
    <div className="h-screen">
      <Playground />
    </div>
  );
}

export default App;
```

### Advanced Usage

```tsx
import React from "react";
import { Playground } from "react-playground-editor";
import "react-playground-editor/dist/style.css";

function App() {
  const handleFileChange = (files) => {
    console.log("Files changed:", files);
  };

  const handleActiveFileChange = (filePath) => {
    console.log("Active file:", filePath);
  };

  return (
    <div className="h-screen">
      <Playground
        initialFiles={{
          "src/App.jsx": `import React from 'react';
          
          function App() {
            return <div>Hello World!</div>;
          }
          
          export default App;`,
        }}
        defaultActiveFile="src/App.jsx"
        showFileExplorer={true}
        showTerminal={true}
        showWebView={true}
        showDependencies={true}
        theme="dark"
        onFileChange={handleFileChange}
        onActiveFileChange={handleActiveFileChange}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop                 | Type                                      | Default     | Description                       |
| -------------------- | ----------------------------------------- | ----------- | --------------------------------- |
| `initialFiles`       | `Record<string, string>`                  | `{}`        | Initial files to load             |
| `defaultActiveFile`  | `string`                                  | `''`        | Default active file path          |
| `showFileExplorer`   | `boolean`                                 | `true`      | Show file explorer panel          |
| `showTerminal`       | `boolean`                                 | `true`      | Show terminal panel               |
| `showWebView`        | `boolean`                                 | `true`      | Show web view panel               |
| `showDependencies`   | `boolean`                                 | `true`      | Show dependencies panel           |
| `theme`              | `'dark' \| 'light'`                       | `'dark'`    | Theme variant                     |
| `onFileChange`       | `(files: Record<string, string>) => void` | `undefined` | Callback when files change        |
| `onActiveFileChange` | `(filePath: string) => void`              | `undefined` | Callback when active file changes |
| `className`          | `string`                                  | `''`        | Additional CSS classes            |
| `style`              | `React.CSSProperties`                     | `undefined` | Inline styles                     |

## Supported File Types

- **React Components**: `.jsx`, `.tsx`
- **JavaScript/TypeScript**: `.js`, `.ts`
- **Stylesheets**: `.css`
- **HTML**: `.html`
- **Data**: `.json`
- **Documentation**: `.md`

## Dependencies

The playground automatically detects and includes common dependencies:

- **React**: `react`, `react-dom`
- **Utilities**: `lodash`, `axios`, `moment`, `uuid`
- **And more...**

## Keyboard Shortcuts

| Shortcut               | Action                    |
| ---------------------- | ------------------------- |
| `Ctrl/Cmd + S`         | Save current file         |
| `Ctrl/Cmd + N`         | Create new file           |
| `Ctrl/Cmd + W`         | Close current file        |
| `Ctrl/Cmd + Tab`       | Switch between open files |
| `F5`                   | Refresh preview           |
| `Ctrl/Cmd + \``        | Toggle terminal           |
| `Ctrl/Cmd + Shift + E` | Toggle file explorer      |
| `Ctrl/Cmd + Shift + V` | Toggle web view           |

## Advanced Usage

### Using Stores Directly

```tsx
import { useFileStore, usePackageManagerStore } from "react-playground-editor";

function MyComponent() {
  const { files, activeFile, addFile } = useFileStore();
  const { packages, installPackage } = usePackageManagerStore();

  const handleAddFile = () => {
    addFile("src/NewFile.jsx", "// New file content");
  };

  return (
    <div>
      <p>Active file: {activeFile}</p>
      <button onClick={handleAddFile}>Add File</button>
    </div>
  );
}
```

### Custom File Types

```tsx
import { Playground } from "react-playground-editor";

const customFileTypes = [
  {
    name: "Python",
    extension: "py",
    icon: <FileCode />,
    template: `# Python script
print("Hello, World!")`,
  },
];

function App() {
  return <Playground fileTypes={customFileTypes} />;
}
```

## Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **CSS Variables**: Override CSS custom properties
2. **Tailwind Config**: Extend the Tailwind configuration
3. **Custom Classes**: Pass custom className props

```css
/* Custom theme */
.playground-container {
  --playground-bg: #1a1a1a;
  --playground-text: #ffffff;
  --playground-accent: #007acc;
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0

- Initial release
- File management system
- Code editing with Monaco Editor
- Live preview with React support
- Dependency management
- Terminal simulation
- Dark theme UI
- Keyboard shortcuts
- Responsive design
