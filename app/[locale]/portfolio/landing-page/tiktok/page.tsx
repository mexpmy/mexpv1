import type { Metadata } from "next";
import TikTokLanding from "./TikTokLanding";

export const metadata: Metadata = {
  title: "Agentic AI for Work That Should Move Faster",
  description:
    "MEXP builds practical agentic AI, microSaaS, analytics, and physical AI systems. Explore the work and what is coming next.",
  alternates: {
    canonical: "/en/portfolio/landing-page/tiktok",
  },
  openGraph: {
    title: "Agentic AI for Work That Should Move Faster | MEXP",
    description:
      "Applied AI, engineered to ship. Explore MEXP's agentic workflows, analytics, and physical AI research.",
    url: "/en/portfolio/landing-page/tiktok",
    images: ["/logo.png"],
  },
};

export default function TikTokLandingPage() {
  return <TikTokLanding />;
}