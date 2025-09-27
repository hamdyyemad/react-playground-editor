import { Breadcrumb } from "@/designs/breadcrumb";
import { Logo } from "@/common/logo";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "React", href: "/react", isActive: true },
];

export function PlaygroundBreadcrumb() {
  return (
    <div className="flex items-center gap-3">
      {/* uE Logo */}
      <Logo />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
