import type { ReactNode } from "react";

import { Navbar } from "~/components/navigation/navbar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <main>
    <Navbar />
    <div className="h-full w-full p-10">{children}</div>
  </main>;
}
