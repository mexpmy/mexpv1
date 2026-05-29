import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering",
  description: "Deep technical work. Systems architecture, clean code, DevOps, and the craft of building reliable infrastructure.",
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
