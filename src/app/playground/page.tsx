import "./globals.css";
import { PlaygroundHeader, PlaygroundBody } from "./components";
import { KeyboardShortcuts } from "../../common/keyboard-shortcuts";

export default function PlaygroundPage() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <KeyboardShortcuts />
      <PlaygroundHeader />
      <PlaygroundBody />
    </div>
  );
}
