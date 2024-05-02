"use client";
import React from "react";
import Searchbar from "../Searchbar";
import NavLinks from "./components/NavLinks";
import MobileMenu from "./components/MobileMenu";
import { FiSearch } from "react-icons/fi";
import { useSession } from "next-auth/react";

// TODO: User avatar -> in progress

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="container bg-primary-300 py-4">
      <div className="flex items-center justify-between">
        <div className="flex_center">
          <h1 className="mr-2 font-bold">Logo</h1>
          {/* Search bar */}
          <Searchbar icon={<FiSearch />} placeholder="Search..." />
        </div>
        {/* Links */}
        <NavLinks session={session} />

        {/* Mobile: Menu */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
