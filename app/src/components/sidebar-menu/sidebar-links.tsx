"use client";
import { sidebarRoutes } from "@/lib/sidebar"; 
import { cn } from "@/lib/utils";
import type { TablerIcon } from "@tabler/icons-react"; 
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks() {
  const pathname = usePathname();

  return (
    <div>
      {sidebarRoutes.map((item, index) => {
        // Remove the unnecessary type assertion
        const Icon = item.icon;
        
        // Coerce both `pathname` and `item.path` to strings for safer comparison
        const isActive = String(pathname) === String(item.path);
        
        return (
          <Link
            href={item.path}
            className={cn([
              "flex items-center gap-3 mb-6 text-white p-3 w-full min-w-40",
              isActive && "bg-white text-black rounded-full  border-primary border-2",
            ])}
            key={index}
          >
            <div className={cn(isActive ? 'bg-black text-white p-2 rounded-full':'p-2')}>
              <Icon className="icon-size" />
            </div>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
