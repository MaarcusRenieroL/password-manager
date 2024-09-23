"use client";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { AvatarIcon } from "@radix-ui/react-icons";

type Props = {
  session?: Session | null;
};

export const Navbar: FC<Props> = ({ session }) => {
  const pathname = usePathname();
  return (
    <div className="h-20 flex items-center justify-between px-10 py-6 w-full border-b">
      <Link href={pathname === "/" ? "/" : "/dashboard"}>
        <h1 className="text-2xl font-bold">Password Manager</h1>
      </Link>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarIcon className="h-8 w-8" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/settings">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="space-x-5">
          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
