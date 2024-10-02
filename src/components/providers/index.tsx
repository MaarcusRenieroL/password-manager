import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";
import { Toaster } from "sonner";
import { NextAuthProvider } from "./next-auth-provider";
import { Session } from "next-auth";
import { ThemeProvider } from "~/components/providers/theme-provider";

type Props = {
  children: ReactNode;
  session: Session | null;
};

export const Providers: FC<Props> = ({ children, session }) => {
  return (
    <TRPCProvider>
      <NextAuthProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </NextAuthProvider>
    </TRPCProvider>
  );
};
