"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ShowPage() {
  const router = useRouter();
  const [id, setId] = React.useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <input
        type="text"
        onChange={(e) => setId(e.target.value)}
        className="p-2 rounded bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-red-500 p-2 rounded" onClick={() => setId("")}>
        Clear
      </button>
      <h1>get value: {id}</h1>
      <button
        className="bg-blue-500 p-2 rounded"
        onClick={() => router.push(`/client/${id}`)}
      >
        Submit
      </button>
      <div>Show Page</div>
    </div>
  );
}
