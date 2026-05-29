import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI / ML",
  description: "Deep dives into artificial intelligence, machine learning, LLMs, agents, and the future of intelligent systems.",
};

export default function AIMLLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
