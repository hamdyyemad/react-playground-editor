import { PlaygroundBreadcrumb } from "./left";

export function PlaygroundHeaderLeft() {
  return (
    <div className="flex items-center gap-4">
      {/* Breadcrumb */}
      <PlaygroundBreadcrumb />
    </div>
  );
}
