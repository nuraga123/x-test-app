"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Dropdown, MenuProps, Avatar, Layout, Space, Typography } from "antd";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { checkToken } from "@/utils/users/checkToken";
import { toast } from "react-toastify";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState({
    name: "",
    role: "",
  });

  useEffect(() => {
    async function loadUser() {
      const tokenData = await checkToken();
      console.log("tokenData", tokenData);

      if (!tokenData.valid) return;

      if (tokenData) {
        setUser({
          name: tokenData.name,
          role: tokenData.role,
        });
      }
    }

    loadUser();
  }, [router, pathname]);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const logout = () => {
    toast("Çıxış edildi");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Çıxış",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <AntHeader
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        boxShadow: "0 2px 8px #f0f1f2",
        height: "54px",
      }}
    >
      <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text strong>{user.name}</Text>
          <Text strong>{user.role}</Text>
          <DownOutlined />
        </Space>
      </Dropdown>
    </AntHeader>
  );
};
