"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { FuelProvider } from '@fuels/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FuelWalletConnector } from '@fuels/connectors';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <QueryClientProvider client={queryClient}>
      <FuelProvider 
      theme="dark"
      fuelConfig={
        {
          connectors: [new FuelWalletConnector()],
        }
      }>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
      >
        <Navbar />
        {children}
      </body>
      </FuelProvider>
      </QueryClientProvider>
    </html>
  );
}
