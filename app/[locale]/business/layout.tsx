import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business",
  description: "Building ventures with purpose at the intersection of technology and entrepreneurship. Real stories from Malaysia and Southeast Asia.",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
