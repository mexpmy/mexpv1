import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Security practices and responsible disclosure.",
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
