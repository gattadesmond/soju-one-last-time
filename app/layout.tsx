import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import "@fontsource/google-sans-flex/latin.css";
import "@fontsource/google-sans-flex/vietnamese.css";
import "./globals.css";
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast";
import { SiteHeader } from "@/components/side-header";

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Soju One Last Time",
  description: "Soju One Last Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonText.variable} light`} suppressHydrationWarning>
      <body className="antialiased  font-sans  bg-gray-50 ">
        <ToastProvider>
          <AnchoredToastProvider>
            <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
              <div
                aria-hidden="true"
                className="before:left-0 after:right-0 container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:w-px after:bg-border/64"
              />
              <div
                aria-hidden="true"
                className="before:left-0 before:-ml-1 after:right-0 after:-mr-1 container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5"
              />
              <SiteHeader />
              <main className=" container pt-28 bg-white px-5 md:px-8 ">
                {children}
              </main>
            </div>
          </AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
