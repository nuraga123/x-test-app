import axios, { AxiosError } from "axios";

export async function checkToken() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("checkToken:  Token not found");
      return { valid: false, errorMessage: "Token not found" };
    }

    const { data } = await axios.get("/api/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("data", data);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ errorMessage: string }>;
    return {
      errorMessage: axiosError.response?.data?.errorMessage,
      valid: false,
    };
  }
}
