import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({
  items,
  separator = <ChevronRight className="w-3 h-3 text-gray-500" />,
  className = "",
}: BreadcrumbProps) {
  return (
    <div
      className={`flex items-center gap-1.5 text-xs text-gray-300 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {item.href && !item.isActive ? (
            <a
              href={item.href}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={
                item.isActive ? "text-white font-medium" : "text-gray-500"
              }
            >
              {item.label}
            </span>
          )}

          {index < items.length - 1 && separator}
        </div>
      ))}
    </div>
  );
}

// Example usage component
// function BreadcrumbExample() {
//   const breadcrumbItems = [
//     { label: "React", href: "/react" },
//     { label: "Components", href: "/react/components" },
//     { label: "Hello World", isActive: true }
//   ];

//   const breadcrumbItems2 = [
//     { label: "Home", href: "/" },
//     { label: "Products", href: "/products" },
//     { label: "Category", href: "/products/category" },
//     { label: "Item Details", isActive: true }
//   ];

//   return (
//     <div className="bg-gray-900 p-8 space-y-6">
//       <div>
//         <h3 className="text-white mb-4 font-semibold">Original Example:</h3>
//         <Breadcrumb items={breadcrumbItems} />
//       </div>

//       <div>
//         <h3 className="text-white mb-4 font-semibold">Another Example:</h3>
//         <Breadcrumb items={breadcrumbItems2} />
//       </div>

//       <div>
//         <h3 className="text-white mb-4 font-semibold">Custom Separator:</h3>
//         <Breadcrumb
//           items={breadcrumbItems}
//           separator={<span className="text-gray-500">→</span>}
//         />
//       </div>

//       <div>
//         <h3 className="text-white mb-4 font-semibold">Without Links:</h3>
//         <Breadcrumb
//           items={[
//             { label: "Dashboard" },
//             { label: "Settings" },
//             { label: "Profile", isActive: true }
//           ]}
//         />
//       </div>
//     </div>
//   );
// }
