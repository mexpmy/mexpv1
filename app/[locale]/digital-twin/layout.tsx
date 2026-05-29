import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Twin | MExp",
  description: "Cinematic Semi-Submersible Digital Twin Experience — Powered by MExp",
};

export default function DigitalTwinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
