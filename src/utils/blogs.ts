import { IBlog } from "@/app/blogs/page";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const AxiosApi = axios.create({
  baseURL: API_URL,
});

export const getBlogs = async () => {
  const res = await AxiosApi.get(API_URL);
  const data = await res.data;
  return data as IBlog[];
};

export const getBlogById = async (id: number) => {
  const res = await AxiosApi.get(`${API_URL}/${id}`);
  const data = await res.data;
  return data as IBlog;
};
