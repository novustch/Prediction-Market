"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "../components/layouts";
import { GlobalProvider } from "@/providers/GlobalContext";
import "react-multi-carousel/lib/styles.css";
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ToastContainer />
              <GlobalProvider>
                <Layout>{children}</Layout>
              </GlobalProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
