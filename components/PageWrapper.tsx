import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function PageWrapper({
  children,
  className,
  withPadding = true,
}: {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
}) {
  return (
    <div className={cn(
      "flex-grow w-full",
      withPadding && "container mx-auto max-w-7xl pt-16 px-6",
      className
    )}>
      {children}
    </div>
  );
}
