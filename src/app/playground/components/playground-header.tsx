import { PlaygroundHeaderLeft, PlaygroundHeaderRight } from "./header";

export function PlaygroundHeader() {
  return (
    <div className="h-12 bg-[#11151c] border-b border-gray-700 flex items-center justify-between px-4">
      {/* Left side - Breadcrumb and Video Controls */}
      <PlaygroundHeaderLeft />

      {/* Right side - Toggle Controls */}
      <PlaygroundHeaderRight />
    </div>
  );
}
