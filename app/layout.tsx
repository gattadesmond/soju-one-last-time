import type { Metadata } from "next";
import { Inter, Crimson_Text } from "next/font/google";
import "./globals.css";
import { ToastProvider, AnchoredToastProvider } from "@/components/ui/toast";
import { SiteHeader } from "@/components/side-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={`${inter.variable} ${crimsonText.variable} light`} suppressHydrationWarning>
      <body className="antialiased text-sm font-sans ">
        <ToastProvider>
          <AnchoredToastProvider>
            <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
              <div
                aria-hidden="true"
                className="before:-left-8 after:-right-8 container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:w-px after:bg-border/64"
              />
              <div
                aria-hidden="true"
                className="before:-left-[32px] before:-ml-1 after:-right-[32px] after:-mr-1 container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5"
              />
              <SiteHeader />
              {children}
            </div>
          </AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
