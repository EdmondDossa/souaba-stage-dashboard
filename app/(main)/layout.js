"use client";

import { Sidebar } from "@/app/(main)/components/Sidebar";
import React, { useEffect } from "react";
import {Header} from "@/app/(main)/components/Header";
import {Footer} from "@/app/(main)/components/Footer";
import { AuthProvider } from "@/context/auth";
import useAuthContext from "@/context/auth";
import { useRouter } from "next/navigation";

function AuthGuard({ children }) {
    const router = useRouter();
    const { isLogged, isLoading } = useAuthContext();

    useEffect(() => {
        if (!isLoading && !isLogged) {
            router.replace("/login");
        }
    }, [isLoading, isLogged, router]);

    if (isLoading || !isLogged) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-700">
                Chargement...
            </div>
        );
    }

    return children;
}

export default function DashboardLayout({ children }) {
    return (
        <AuthProvider>
            <AuthGuard>
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 ml-[200px] bg-gray-50 p-6 overflow-y-auto">
                        <Header />
                        {children}
                        <Footer />
                    </main>
                </div>
            </AuthGuard>
        </AuthProvider>
    );
}
