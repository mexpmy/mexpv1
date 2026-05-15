"use client";
import { useState } from "react";
import styles from "./Controls.module.css";
import { FaHome, FaUser, FaBriefcase, FaNewspaper, FaEnvelopeOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  external?: boolean;
};

const items: Item[] = [
  { id: "home", label: "Home", icon: <FaHome />, href: "/" },
  { id: "about", label: "About", icon: <FaUser />, href: "/about" },
  { id: "portfolio", label: "Portfolio", icon: <FaBriefcase />, href: "/portfolio" },
  { id: "blogs", label: "Blogs", icon: <FaNewspaper />, href: "/blog"},
  { id: "contact", label: "Contact", icon: <FaEnvelopeOpen />, href: "/contact" },
];

export default function Controls() {
  const router = useRouter();
  const [active, setActive] = useState<string>("home");

  function onActivate(item: Item) {
    setActive(item.id);
    if (item.external && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.href) {
      router.push(item.href);
    }
  }

  return (
    <nav className={styles.controls} aria-label="Primary controls">
      {items.map((it) => (
        <button
          key={it.id}
          className={`${styles.control} ${active === it.id ? styles["active-btn"] : ""}`}
          onClick={() => onActivate(it)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onActivate(it);
          }}
          aria-pressed={active === it.id}
          title={it.label}
          type="button"
        >
          {it.icon}
        </button>
      ))}
    </nav>
  );
}