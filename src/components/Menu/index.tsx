"use client";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const Menu = ({ items }: IMenu) => {
  return (
    <div className="dropdown dropdown-left">
      <button>
        <HiDotsVertical />
      </button>
      <ul className="menu menu-sm dropdown-content bg-white shadow-md w-56 rounded-box z-50">
        {items.map(({ label, onClick }) => (
          <li key={label}>
            <button onClick={onClick}>{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
