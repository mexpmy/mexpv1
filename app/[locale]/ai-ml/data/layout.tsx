import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI / ML · Data",
  description: "Deep dives into the physical systems, storage, and data infrastructure behind intelligent machines.",
};

export default function DataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
