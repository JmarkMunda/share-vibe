import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-l from-yellow-200 via-yellow-300 to-yellow-400 h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
