import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const font = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Furnace",
  description: "Create Minecraft servers in seconds with Furnace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
