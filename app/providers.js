"use client";

import { AuthProvider } from "@/context/auth";

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
