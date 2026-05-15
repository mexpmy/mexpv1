"use client";

import { ScrollShadow } from "@heroui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Navigation tree ──────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: string; // Tabler icon name, e.g. "home"
}

interface NavGroup {
  heading: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    heading: "Getting started",
    items: [
      { label: "Introduction", href: "/docs", icon: "home" },
      { label: "Installation", href: "/docs/installation", icon: "download" },
      { label: "Configuration", href: "/docs/configuration", icon: "settings" },
    ],
  },
  {
    heading: "Components",
    items: [
      { label: "Layout", href: "/docs/components/layout", icon: "layout" },
      { label: "Navbar", href: "/docs/components/navbar", icon: "layout-navbar" },
      { label: "Theming", href: "/docs/components/theming", icon: "palette" },
    ],
  },
  {
    heading: "Guides",
    items: [
      { label: "Deployment", href: "/docs/guides/deployment", icon: "rocket" },
      { label: "API routes", href: "/docs/guides/api-routes", icon: "code" },
    ],
  },
];

// ─── Sidebar item ─────────────────────────────────────────────────
function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    item.href === "/docs"
      ? pathname === "/docs"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className={`
        flex items-center gap-2 px-3 py-[7px] rounded-lg text-sm transition-all duration-150
        ${isActive
          ? "bg-default-100 text-foreground font-medium border border-default-200"
          : "text-default-500 hover:bg-default-50 hover:text-foreground"
        }
      `}
    >
      <i className={`ti ti-${item.icon} text-[15px]`} aria-hidden="true" />
      {item.label}
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────
function DocsSidebar() {
  return (
    <ScrollShadow
      as="nav"
      aria-label="Documentation navigation"
      className="
        sticky top-16 h-[calc(100vh-4rem)] w-56 flex-shrink-0
        border-r border-divider bg-content1
        flex flex-col gap-1 px-3 py-4 overflow-y-auto
      "
    >
      {NAV.map((group) => (
        <div key={group.heading} className="mb-1">
          <p className="px-2 pb-1.5 pt-3 text-[10px] font-medium uppercase tracking-widest text-default-400 first:pt-1">
            {group.heading}
          </p>
          {group.items.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </div>
      ))}
    </ScrollShadow>
  );
}

// ─── Layout ───────────────────────────────────────────────────────
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DocsSidebar />
      <motion.main
        key="docs-main"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex-1 px-8 py-10 max-w-3xl"
      >
        {children}
      </motion.main>
    </div>
  );
}