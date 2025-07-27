"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Button, Spin } from "antd";
import { loginUser } from "@/utils/users/loginUser";
import { LoginFormValues } from "@/types/users";
import Logo from "@/assets/img/logo_gps.png";
import styles from "./styles.module.scss";

export default function LoginComponent() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      const { name, password } = values;
      setError("");

      if (!name || !password) {
        toast("ad və şifrə daxil edin", { type: "error" });
        setError("Xəta baş verdi");
        return;
      }

      const userData = await loginUser({ name, password });

      console.log("userData");
      console.log(userData);

      if (!userData) {
        toast("Xəta baş verdi", { type: "error" });
        setError("Xəta baş verdi");
        return;
      } else if (userData?.errorMessage) {
        toast(userData.errorMessage, { type: "error" });
        setError(userData.errorMessage);
        return;
      } else {
        localStorage.setItem("token", userData.user.token);
        setLoading(false);
        toast("Uğurlu giriş", { type: "success" });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast(error as string, { type: "error" });
      setLoading(false);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    toast("Zəhmət olmasa bütün sahələri doldurun", { type: "error" });
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__wrapper}>
        <Image
          className={styles.login__logo}
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
        />
        <h4 className={styles.login__subtitle}>
          Zəhmət olmasa, daxil olmaq üçün istifadəçi adınızı və şifrənizi daxil
          edin.
        </h4>
        <br />
        {error && <p className={styles.login__error}>{error}</p>}

        <div className={styles.login__flex}>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.login__form}
          >
            <Form.Item
              label="Ad"
              className={styles.login__input}
              name="name"
              rules={[
                { required: true, message: "Zəhmət olmasa adınızı daxil edin" },
              ]}
            >
              <Input className={styles.login__name} autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="Şifrə"
              className={`
                ${styles.login__input} 
                ${styles.login__password}`}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Zəhmət olmasa şifrənizi daxil edin",
                },
              ]}
            >
              <Input.Password
                className={styles.login__input}
                autoComplete="current-password"
              />
            </Form.Item>

            <div style={{ display: "flex", gap: "1rem", height: 40 }}>
              <Form.Item style={{ flex: 1 }}>
                <Button
                  htmlType="submit"
                  className={styles.login__button}
                  block
                >
                  {loading && <Spin size="small" />}
                  {loading ? "Yoxlanılır..." : "Daxil ol"}
                </Button>
              </Form.Item>

              <Form.Item style={{ flex: 1 }}>
                <Button
                  type="primary"
                  className={styles.register__button}
                  block
                  onClick={() => router.push("/register")}
                >
                  Qeydiyyat
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
