import axios, { AxiosError } from "axios";

export async function registerUser({
  name,
  password,
  email,
  role,
}: {
  name: string;
  password: string;
  email: string;
  role: "user" | "admin" | "courier";
}) {
  try {
    const { data } = await axios.post("/api/register", {
      name,
      password,
      email,
      role,
    });

    console.log("data", data);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ errorMessage: string }>;
    return { errorMessage: axiosError.response?.data?.errorMessage };
  }
}
