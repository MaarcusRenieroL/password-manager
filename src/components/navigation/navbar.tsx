"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: FC = () => {
  const pathname = usePathname();
  return (
    <div className="h-20 flex items-center justify-between px-10 py-6 w-full border-b">
      <Link href={pathname === "/" ? "/" : "/dashboard"}>
        <h1 className="text-2xl font-bold">Password Manager</h1>
      </Link>
      <div className="space-x-5">
        <Button>Sign Up</Button>
        <Button variant="outline">Sign In</Button>
      </div>
    </div>
  );
};
