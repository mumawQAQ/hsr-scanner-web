import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "next-themes";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {ClerkProvider} from "@clerk/nextjs";
import Header from "@/components/header";
import ModalProvider from "@/components/providers/modal-provider";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "HSR-Scanner",
    description: "Scanner that help analysis HSR relics",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider afterSignOutUrl="/">
            <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="hsr-scanner">
                <ModalProvider/>
                <SidebarProvider>
                    <AppSidebar/>
                    <SidebarInset>
                        <Header/>
                        <main className="flex flex-1 flex-col gap-4 p-4">
                            {children}
                            <ToastContainer/>
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>

    );
}
