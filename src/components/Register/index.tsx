"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Input, Button, Spin } from "antd";
import Logo from "@/assets/img/logo_gps.png";
import { IUser } from "@/types/users";
import { registerUser } from "@/utils/users/registerUser";
import styles from "./styles.module.scss"; // переиспользуем стили
import { validateUser } from "@/utils/users/validation";
import { Select } from "antd";

type ShowRoleType =
  | {
      role: "user";
      lang: "ambardar";
    }
  | {
      role: "courier";
      lang: "kurier";
    }
  | {
      role: "admin";
      lang: "Sayt Admin";
    };

export default function RegisterComponent() {
  const { Option } = Select;
  const router = useRouter();

  const [showRole, setShowRole] = useState<ShowRoleType>(() => {
    return {
      role: "user",
      lang: "ambardar",
    };
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: IUser & { checkPassword: string }) => {
    try {
      const { name, email, password, checkPassword, role } = values;
      console.log(values);

      if (password !== checkPassword) {
        toast("Şifrələr eyni deyil", { type: "error" });
        setError("Şifrələr eyni deyil");
        return;
      }

      const registerValid = validateUser({ name, email, password, role });
      console.log(registerValid);

      if (typeof registerValid !== "boolean") {
        setError(registerValid.invalidMessages.join("\n"));
        return;
      }

      setLoading(true);
      setError("");

      const response = await registerUser({ name, email, password, role });

      if (response?.errorMessage) {
        toast(response.errorMessage, { type: "error" });
        setError(response.errorMessage);
        return;
      }

      console.log("response", response);

      // toast("Qeydiyyat uğurla tamamlandı!", { type: "success" });
      // router.push("/login");
    } catch (err) {
      console.error(err);
      toast(err as string, { type: "error" });
      setError("Qeydiyyat zamanı xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    toast("Zəhmət olmasa bütün sahələri doldurun", { type: "error" });
  };

  return (
    <div className={styles.login} style={{ overflow: "auto", height: "100%" }}>
      <div className={styles.login__wrapper}>
        <Image
          className={styles.login__logo}
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
        />
        <h4 className={styles.login__subtitle}>
          Zəhmət olmasa, qeydiyyatdan keçmək üçün bütün sahələri doldurun.
        </h4>
        <br />
        {error && <p className={styles.login__error}>{error}</p>}

        <div
          className={styles.login__flex}
          style={{ display: "flex", gap: "1rem" }}
        >
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles.login__form}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Form.Item
                label="Ad"
                name="name"
                className={styles.login__input}
                rules={[
                  {
                    required: true,
                    message: "Zəhmət olmasa adınızı daxil edin",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                className={styles.login__input}
                rules={[
                  { required: true, message: "Zəhmət olmasa email daxil edin" },
                  { type: "email", message: "Email formatı düzgün deyil" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label={`Vəzifəsi: ${showRole.lang}`}
                valuePropName="selected"
                name="role"
                className={styles.login__input}
                rules={[
                  { required: true, message: "Zəhmət olmasa vəzifəsini seçin" },
                ]}
              >
                <Select
                  onChange={(value: string) => {
                    if (value === "user") {
                      setShowRole({ role: "user", lang: "ambardar" });
                    } else if (value === "courier") {
                      setShowRole({ role: "courier", lang: "kurier" });
                    }
                  }}
                >
                  <Option value="user">Ambardar</Option>
                  <Option value="courier">Kurier</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Şifrə"
                name="password"
                className={styles.login__input}
                rules={[
                  {
                    required: true,
                    message: "Zəhmət olmasa şifrənizi daxil edin",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Şifrə tezeden daxil edin"
                name="checkPassword"
                className={styles.login__input}
                rules={[
                  {
                    required: true,
                    message: "Zəhmət olmasa şifrənizi tezeden daxil edin",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "1rem", height: 40 }}>
              <Form.Item style={{ flex: 1 }}>
                <Button
                  htmlType="submit"
                  className={styles.login__button}
                  block
                >
                  {loading && <Spin size="small" />}
                  {loading ? "Yoxlanılır..." : "Qeydiyyatdan keç"}
                </Button>
              </Form.Item>

              <Form.Item style={{ flex: 1 }}>
                <Button
                  type="primary"
                  className={styles.register__button}
                  block
                  onClick={() => router.push("/login")}
                >
                  Giriş
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
