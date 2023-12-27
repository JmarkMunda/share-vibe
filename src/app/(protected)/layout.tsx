import Navbar from "@/components/Navbar";
import RightSideBar from "@/components/RightSideBar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex-1 p-8">{children}</section>
        <RightSideBar />
      </div>
    </div>
  );
}
