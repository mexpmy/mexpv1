import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oil & Gas",
  description: "Heavy industry through an engineer's lens. Digital transformation, simulation, SCADA, and upstream operations.",
};

export default function OilGasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
