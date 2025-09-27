import { useState, useRef, useEffect } from "react";
import { useTerminalCommandsStore } from "@/stores/terminal/terminal-commands-store";
import { usePackageManagerStore } from "@/stores/package-manager/package-manager-store";

export function TerminalTab() {
  const { commands, addCommand, updateCommandOutput, clearCommands } =
    useTerminalCommandsStore();
  const { installPackage, uninstallPackage, updatePackage } =
    usePackageManagerStore();
  const [currentCommand, setCurrentCommand] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    addCommand(cmd);
    setIsRunning(true);

    try {
      let output = "";
      let status: "success" | "error" = "success";

      // Handle package installation commands
      if (
        cmd.startsWith("npm install") ||
        cmd.startsWith("pnpm add") ||
        cmd.startsWith("yarn add")
      ) {
        const parts = cmd.split(" ");
        const packageName = parts[parts.length - 1];
        const isDev = parts.includes("--save-dev") || parts.includes("-D");

        if (
          packageName &&
          packageName !== "--save-dev" &&
          packageName !== "-D"
        ) {
          output = `Installing ${packageName}...\n`;
          await installPackage(
            packageName,
            isDev ? "devDependency" : "dependency"
          );
          output += `✓ ${packageName} installed successfully\n✓ Dependencies updated\n✓ WebView will reload with new package`;
        } else {
          output = "Error: Please specify a package name";
          status = "error";
        }
      }
      // Handle package uninstallation
      else if (
        cmd.startsWith("npm uninstall") ||
        cmd.startsWith("npm remove") ||
        cmd.startsWith("pnpm remove") ||
        cmd.startsWith("yarn remove")
      ) {
        const parts = cmd.split(" ");
        const packageName = parts[parts.length - 1];

        if (packageName) {
          output = `Uninstalling ${packageName}...\n`;
          await uninstallPackage(packageName);
          output += `✓ ${packageName} uninstalled successfully\n✓ WebView will reload without the package`;
        } else {
          output = "Error: Please specify a package name";
          status = "error";
        }
      }
      // Handle package update
      else if (
        cmd.startsWith("npm update") ||
        cmd.startsWith("pnpm update") ||
        cmd.startsWith("yarn upgrade")
      ) {
        const parts = cmd.split(" ");
        const packageName = parts[parts.length - 1];

        if (
          packageName &&
          packageName !== "update" &&
          packageName !== "upgrade"
        ) {
          output = `Updating ${packageName}...\n`;
          await updatePackage(packageName, "latest");
          output += `✓ ${packageName} updated successfully\n✓ WebView will reload with updated package`;
        } else {
          output =
            "Updating all packages...\n✓ All packages updated successfully";
        }
      }
      // Handle development server
      else if (
        cmd === "npm start" ||
        cmd === "pnpm dev" ||
        cmd === "yarn dev"
      ) {
        output =
          "Starting development server...\n✓ Server running on http://localhost:3000\n✓ Hot reload enabled";
      }
      // Handle build commands
      else if (
        cmd === "npm run build" ||
        cmd === "pnpm build" ||
        cmd === "yarn build"
      ) {
        output =
          "Building for production...\n✓ Build completed successfully\n✓ Optimized bundle created";
      }
      // Handle test commands
      else if (
        cmd === "npm test" ||
        cmd === "pnpm test" ||
        cmd === "yarn test"
      ) {
        output = "Running tests...\n✓ All tests passed\n✓ Test coverage: 85%";
      }
      // Handle file listing
      else if (cmd === "ls" || cmd === "dir") {
        output =
          "package.json\nsrc/\npublic/\nnode_modules/\nREADME.md\n.gitignore";
      }
      // Handle current directory
      else if (cmd === "pwd") {
        output = "/home/user/projects/s0oejegul2";
      }
      // Handle clear command
      else if (cmd === "clear") {
        clearCommands();
        setIsRunning(false);
        return;
      }
      // Handle unknown commands
      else {
        output = `Command not found: ${cmd}\nTry: npm install <package>, npm uninstall <package>, npm start, npm run build, ls, pwd, clear`;
        status = "error";
      }

      // Update the last command with output
      const lastCommand = commands[commands.length - 1];
      if (lastCommand) {
        updateCommandOutput(lastCommand.id, output, status);
      }
    } catch (error) {
      const lastCommand = commands[commands.length - 1];
      if (lastCommand) {
        updateCommandOutput(
          lastCommand.id,
          `Error: ${
            error instanceof Error ? error.message : "Unknown error occurred"
          }`,
          "error"
        );
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-2">
      {/* Command History */}
      {commands.map((cmd) => (
        <div key={cmd.id} className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">~/projects/s0oejegul2</span>
            <span className="text-gray-500">&gt;</span>
            <span className="text-white">{cmd.command}</span>
            {cmd.status === "running" && (
              <span className="text-yellow-400 animate-pulse">⏳</span>
            )}
          </div>
          {cmd.output && (
            <div
              className={`whitespace-pre-line ml-4 ${
                cmd.status === "error" ? "text-red-400" : "text-gray-300"
              }`}
            >
              {cmd.output}
            </div>
          )}
        </div>
      ))}

      {/* Current Input */}
      <div className="flex items-center gap-2">
        <span className="text-blue-400">~/projects/s0oejegul2</span>
        <span className="text-gray-500">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isRunning}
          className="flex-1 bg-transparent text-white outline-none disabled:opacity-50"
          placeholder={isRunning ? "Executing..." : "Type a command..."}
        />
      </div>

      {/* Help Text */}
      <div className="text-gray-500 text-xs mt-4">
        Package commands: npm install &lt;package&gt;, npm start, npm run build,
        npm test
      </div>
    </div>
  );
}
