"use client";

import Link from "next/link";
import { MenuIcon, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <header className="px-4 lg:px-6 h-14 hidden lg:flex items-center gap-5 border-b">
        <Link className="flex items-center justify-center" href="#">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SecurePass</span>
        </Link>
        <nav className="ml-auto flex sm:gap-6 gap-5">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#home"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <Link href="/auth/sign-up">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>
      <header className="px-4 lg:px-6 h-14 flex lg:hidden items-center justify-between gap-5 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>SecurePass</SheetTitle>
            </SheetHeader>
            <div className="mt-5 space-y-5">
              <Link
                href="#home"
                className={clsx(
                  "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                  pathname === "#home" &&
                    "text-primary font-semibold border-border bg-secondary",
                )}
              >
                Home
              </Link>
              <Link
                href="#features"
                className={clsx(
                  "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                  pathname === "#features" &&
                    "text-primary font-semibold border-border bg-secondary",
                )}
              >
                Features
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link className="flex items-center justify-center" href="#">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SecurePass</span>
        </Link>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>
    </>
  );
};

