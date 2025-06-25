"use client";

import Navbar from "./NavBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-pink-100 blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-amber-100 blur-3xl opacity-20"></div>
      </div>

      {/* Main content */}
      <main className="pt-20">{children}</main>
    </div>
  );
}