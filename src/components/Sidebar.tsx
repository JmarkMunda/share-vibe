"use client";
import Link from "next/link";
import React from "react";
import { CgFeed } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { LuMonitorPlay } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const routes = [
    {
      path: "/feed",
      label: "Feed",
      icon: <CgFeed className="icon" />,
    },
    {
      path: "/friends",
      label: "Friends",
      icon: <FiUsers className="icon" />,
    },
    {
      path: "/watch",
      label: "Watch",
      icon: <LuMonitorPlay className="icon" />,
    },
  ];

  return (
    <aside className="h-screen w-60 py-10 bg-primary-100">
      {routes.map((route) => (
        <Link
          href={route.path}
          key={route.label}
          className={`flex items-center flex-row px-10 py-4 my-2 hover:text-primary-500 hover:font-bold ${
            pathname === route.path && "active-link"
          }`}>
          <span className="mr-4">{route.icon}</span>
          <h3>{route.label}</h3>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
