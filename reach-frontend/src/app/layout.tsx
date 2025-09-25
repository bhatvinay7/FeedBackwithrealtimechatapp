import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxRootProvider from "@/components/ui/ReduxRootProvider";
import Auth from '@/components/ui/auth'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "reach",
  description: "reach - Your Smart Workspace for Feedback, Task Management, and Real-Time Notifications",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  ${geistSans.variable} ${geistMono.variable} bg-white min-h-screen relative antialiased`}
      >
       
      
          < ReduxRootProvider>
            <Auth>
              {children}
              
              </Auth>


          </ReduxRootProvider>

      </body>
    </html>
  );
}
