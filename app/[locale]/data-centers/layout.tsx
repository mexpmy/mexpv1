import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Centers",
  description: "The infrastructure powering the digital economy. Colocation, hyperscale, power, cooling, and Southeast Asia's emerging role.",
};

export default function DataCentersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
