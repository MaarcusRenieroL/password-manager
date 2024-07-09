import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";
import { Toaster } from "sonner";
import { NextAuthProvider } from "./next-auth-provider";
import { Session } from "next-auth";

type Props = {
  children: ReactNode;
  session: Session | null;
};

export const Providers: FC<Props> = ({ children, session }) => {
  return (
    <TRPCProvider>
      <NextAuthProvider session={session}>
        {children}
        <Toaster />
      </NextAuthProvider>
    </TRPCProvider>
  );
};
