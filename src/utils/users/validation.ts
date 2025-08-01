import { IUser } from "@/types/users";

export const validateUser = ({ name, email, password, role }: IUser) => {
  const invalidMessages: string[] = [];
  // Проверка имени
  if (!name || name.trim().length < 3) {
    invalidMessages.push("Имя должно содержать минимум 3 символа.");
  }

  // Проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    invalidMessages.push("Укажите корректный адрес электронной почты.");
  }

  // Проверка пароля
  if (!password || password.length < 6) {
    invalidMessages.push("Пароль должен содержать минимум 6 символов.");
  }

  // Проверка роли
  if (role !== "user" && role !== "courier" && role !== "admin") {
    console.log("role", role);
    console.log("user", role === "user");
    console.log("courier", role === "courier");
    console.log("admin", role === "admin");
    invalidMessages.push(
      "Роль должна быть одной из следующих: админ, складчик, курьер"
    );
  }

  if (invalidMessages.length > 0) {
    return { invalidMessages };
  }

  return true;
};
