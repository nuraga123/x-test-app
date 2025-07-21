"use client";

import Link from "next/link";
import React from "react";

const menuArray = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/client", label: "Client" },
  { href: "/client/show", label: "Show" },
  { href: "/client/nuraga", label: "Client Nuraga" },
];

export const Header = () => {
  return (
    <div className="bg-gray-900 text-white shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">GPS</div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          {menuArray.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
