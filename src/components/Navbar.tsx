import Link from "next/link";
import React from "react";
import Searchbar from "./Searchbar";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <nav className="bg-yellow-200 p-4">
      <div className="flex items-center">
        <h1>Logo</h1>
        {/* Search bar */}
        <Searchbar icon={<FiSearch />} placeholder="Search..." />
        {/* Links */}
        <Link href="/" className="nav_links">
          Home
        </Link>
        <Link href="/" className="nav_links">
          Profile
        </Link>
        <Link href="/" className="nav_links">
          Settings
        </Link>

        <button className="p-2 bg-red-300">
          <RxHamburgerMenu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
