"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Button from "@/components/Button";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl">HomePage</h1>
      <Button
        variant="primary"
        onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
