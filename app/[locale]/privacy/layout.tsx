import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MExp handles your data.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
