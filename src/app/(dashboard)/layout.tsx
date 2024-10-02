import type { ReactNode } from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

import { Navbar } from "~/components/navigation/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <Navbar session={session} />
      <div className="h-full w-full p-10">{children}</div>
    </main>
  );
}
