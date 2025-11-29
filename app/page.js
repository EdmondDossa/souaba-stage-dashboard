"use server";

import { redirect } from "next/navigation";

export default function Home() {
  // Redirect visitors hitting the root to the login screen.
  redirect("/login");
}
