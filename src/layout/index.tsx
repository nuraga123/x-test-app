"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { checkToken } from "@/utils/users/checkToken";
import { Navbar } from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { Header } from "@/components/Header";
import styles from "./styles.module.scss";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { valid } = await checkToken();
      console.log("valid", valid);

      if (!valid) {
        if (pathname.includes("register")) {
          setLoading(false);
          router.push("/register");
          return;
        }

        if (!pathname.includes("login")) {
          toast("Token vaxtı bitib", { type: "error" });
          setLoading(false);
          router.push("/login");
          return;
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) return <Preloader />;

  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.wrapper}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
