"use client";

import React from "react";
import Link from "next/link";
import { IBlog } from "@/app/blogs/page";

export const BlogComponent = ({ id, title, body }: IBlog) => {
  if (!id) return <div>Blog not found</div>;

  return (
    <div className="flex flex-col gap-2 m-2.5 p-2.5 rounded">
      <Link href="/blogs">Back to Blogs</Link>
      <h1 className="text-2xl font-bold">Id: {id}</h1>
      <h2>Title: {title}</h2>
      <p>Body: {body}</p>
    </div>
  );
};
