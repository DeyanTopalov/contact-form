import type { Metadata } from "next";
import { karla } from "./ui/fonts";
import "@styles/globals.css";
import { Toaster } from "@components/ui/toaster";

export const metadata: Metadata = {
  title: "Contact Form",
  description: "Frontend Mentor challenge to build a Contact Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${karla.className} bg-clr-green-200 grid h-svh w-svw place-items-center gap-0 text-left text-lg antialiased md:h-screen md:w-full`}
      >
        <Toaster />
        <main className="grid h-svh w-svw place-items-center px-4 md:max-w-[90rem] md:px-10">
          {children}
        </main>
      </body>
    </html>
  );
}
