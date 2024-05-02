"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button className="p-2 md:hidden" onClick={() => setShowMenu(true)}>
        <RxHamburgerMenu className="h-6 w-6" />
      </button>
      {/* Sidebar */}
      {showMenu && (
        <div className="absolute top-0 right-0 h-full bg-gray-200 flex flex-col p-6 md:hidden">
          <button
            className="relative p-2 md:hidden"
            onClick={() => setShowMenu(false)}>
            <IoClose className="h-6 w-6" />
          </button>
          <Link href="/home" className="nav_links my-2">
            Home
          </Link>
          <Link href="/profile" className="nav_links my-2">
            Profile
          </Link>
          <Link href="/settings" className="nav_links my-2">
            Settings
          </Link>

          <Button
            variant="primary"
            onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </Button>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
