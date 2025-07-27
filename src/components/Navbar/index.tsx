"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBlog,
  FaUserAlt,
  FaUsers,
  FaEye,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import Logo from "@/assets/img/logo_gps.png";
import styles from "./styles.module.scss";

const menuArray = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/blogs", label: "Blogs", icon: <FaBlog /> },
  { href: "/about", label: "About", icon: <FaUserAlt /> },
  {
    label: "Client",
    icon: <FaUsers />,
    subMenu: [
      { href: "/client/show", label: "Show", icon: <FaEye /> },
      {
        href: "/client/nuraga",
        label: "Client Nuraga",
        icon: <FaUserCircle />,
      },
    ],
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const toggleSubMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          className={styles.login__logo}
          src={Logo}
          alt="Logo"
          width={150}
          height={150}
        />
      </div>
      <nav className={styles.menu}>
        <ul>
          {menuArray.map((item) =>
            item.subMenu ? (
              <li key={item.label}>
                <button
                  className={styles.menuButton}
                  onClick={() => toggleSubMenu(item.label)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.label}
                  <FaChevronDown
                    className={`${styles.chevron} ${
                      openMenu === item.label ? styles.open : ""
                    }`}
                  />
                </button>
                <ul
                  className={`${styles.subMenu} ${
                    openMenu === item.label ? styles.visible : ""
                  }`}
                >
                  {item.subMenu.map((sub) => (
                    <li key={sub.href}>
                      <Link href={sub.href} className={styles.link}>
                        <span className={styles.icon}>{sub.icon}</span>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  <span className={styles.icon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};
