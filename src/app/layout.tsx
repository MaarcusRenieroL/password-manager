import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "~/components/providers";
<<<<<<< HEAD
import { Navbar } from "~/components/navigation/navbar";
=======
>>>>>>> trpc

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Password Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
<<<<<<< HEAD
        <Navbar />
=======
>>>>>>> trpc
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
