"use client";
import Link from "next/link";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-primary-300 py-4 px-10">
      <div className="flex items-center justify-between">
        <div className="flex_center">
          <h1 className="mr-2 font-bold">Logo</h1>
          {/* Search bar */}
          <Searchbar icon={<FiSearch />} placeholder="Search..." />
        </div>
        {/* Links */}
        <div className="hidden md:flex md:items-center">
          <Link href="/messages" className="nav_links">
            Messages
          </Link>
          <Link href="/notifications" className="nav_links">
            Notifications
          </Link>
          <Link href="/settings" className="nav_links">
            Settings
          </Link>

          <Button
            variant="primary"
            onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </Button>
        </div>

        {/* Mobile: Menu */}
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
      </div>
    </nav>
  );
};

export default Navbar;
