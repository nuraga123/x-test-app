"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PaginationBlogComponent } from "@/components/Blog/Pagination";
import { getBlogs } from "@/utils/blogs";

export interface IBlog {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalBlogs / limit);
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedBlogs = blogs.slice(start, end);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogsData = await getBlogs();
        console.log(blogsData);
        setTotalBlogs(blogsData.length);
        setBlogs(blogsData);
      } catch (error) {
        console.log(error);
      }
    };

    loadBlogs();
  }, []);

  const nextBlog = () => {
    setPage(page + 1);
  };

  const prevBlog = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">Blogs Page</h1>
      <ul className="flex flex-col gap-2 px-4">
        {paginatedBlogs.map((item: IBlog) => (
          <li
            key={item.id}
            className="flex justify-between gap-2 p-2 border rounded my-2"
          >
            <div>
              <span>
                {item.id}) {item.title}
              </span>
            </div>
            <Link
              href={`/blogs/${item.id}`}
              className="text-white w-fit cursor-pointer bg-blue-500 p-2 rounded hover:underline"
            >
              Details Blog
            </Link>
          </li>
        ))}
      </ul>

      <PaginationBlogComponent
        page={page}
        totalPages={totalPages}
        prevBlog={prevBlog}
        nextBlog={nextBlog}
        setPage={setPage}
      />
    </div>
  );
}
