"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgFeed } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { LuMonitorPlay } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Modal from "./Modal";

const Sidebar = () => {
  const pathname = usePathname();
  const [createPostModal, setCreatePostModal] = useState(false);

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
    <aside className="flex_col">
      <div className="h-[50vh] w-60 py-10 glass_card overflow-y-auto scrollbar">
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
      </div>
      {/* Create Post */}
      <button
        onClick={() => setCreatePostModal(true)}
        className="bg-primary-400 shadow-md rounded-2xl px-8 py-4 my-4 text-center font-bold hover:bg-primary-500">
        Create Post
      </button>

      {/* Modal */}
      <Modal show={createPostModal} setShow={setCreatePostModal} />
    </aside>
  );
};

export default Sidebar;
