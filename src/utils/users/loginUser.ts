import axios, { AxiosError } from "axios";

export async function loginUser({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  try {
    const { data } = await axios.post("/api/users/login", {
      name,
      password,
    });

    console.log("data", data);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ errorMessage: string }>;
    return { errorMessage: axiosError.response?.data?.errorMessage };
  }
}
