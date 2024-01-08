"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/rtk/store";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </ReduxProvider>
  );
};

export default Provider;
