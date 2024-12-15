import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type LayoutProps = Readonly<{
  children: ReactNode;
}>

export default function RootLayout({children}: LayoutProps) {
  return (
      <html lang="en">
      <body>
        {children}
      </body>
      </html>
  );
}
