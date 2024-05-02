import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { INavLinks } from "../types";

const NavLinks = ({ session }: INavLinks) => {
  return (
    <div className="hidden md:flex md:items-center">
      <Link href="/messages" className="nav_links">
        Messages
      </Link>
      <Link href="/notifications" className="nav_links">
        Notifications
      </Link>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex_center gap-2 p-2 rounded-full glass_card">
          <Avatar src={session?.user.image} width={30} height={30} />
          <p>{session?.user.name}</p>
          <IoMdArrowDropdown />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-4 shadow-xl bg-base-100 rounded-box w-52 gap-2 ">
          <p>{session?.user.name}</p>
          <p className="text-sm text-gray-300">@{session?.user.username}</p>
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <Button
            variant="primary"
            onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
