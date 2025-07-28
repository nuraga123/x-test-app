import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkToken() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("checkToken:  Token not found");
      return { valid: false, errorMessage: "Token not found" };
    }

    const { data } = await axios.get(`${API_URL}/api/users/verify-token`, {
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

export async function verifyTokenApi(req: Request) {
  try {
    const token = req.headers.get("authorization");

    const { data } = await axios.get(`${API_URL}/api/users/verify-token`, {
      headers: {
        Authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.log("error", error);
    const axiosError = error as AxiosError<{ errorMessage: string }>;
    return {
      errorMessage: axiosError.response?.data?.errorMessage,
      valid: false,
    };
  }
}
