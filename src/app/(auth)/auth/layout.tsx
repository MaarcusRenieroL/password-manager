import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
}
