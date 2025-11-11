import { Sidebar } from "@/app/(main)/components/Sidebar";
import React from "react";
import {Header} from "@/app/(main)/components/Header";
import {Footer} from "@/app/(main)/components/Footer";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                <Header />
                {children}
                <Footer />
            </main>

        </div>
    );
}
