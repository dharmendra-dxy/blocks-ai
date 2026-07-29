import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Blocks AI",
  description: "Real time architecture solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "var(--primary)",
          colorBackground: "var(--background)",
          colorForeground: "var(--foreground)",
          colorInput: "var(--card)",
          colorInputForeground: "var(--foreground)",
          colorBorder: "var(--border)",
          colorDanger: "var(--destructive)",
          colorSuccess: "var(--primary)",
          colorWarning: "var(--accent)",
          colorNeutral: "var(--muted-foreground)",
          fontFamily: "var(--font-sans)",
          borderRadius: "var(--radius)",
        },
      }}
    >
      <html
        lang="en"
        className={`${poppins.className} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
