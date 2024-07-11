"use client";

import type { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  children?: ReactNode;
  session: Session | null;
};

export const NextAuthProvider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
