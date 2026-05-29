import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal information about the operator of this site.",
};

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
