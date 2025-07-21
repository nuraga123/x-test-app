"use client";

import React from "react";

type Props = {
  page: number;
  totalPages: number;
  prevBlog: () => void;
  nextBlog: () => void;
  setPage: (index: number) => void;
};

export const PaginationBlogComponent = ({
  page,
  totalPages,
  prevBlog,
  nextBlog,
  setPage,
}: Props) => {
  const isActive = (index: number) => index === page;

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page <= 4) {
        for (let i = 2; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push("...");
        for (let i = page - 2; i <= page + 2; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const renderPage = (p: number | "...", i: number) => {
    if (p === "...") {
      return (
        <li key={`dots-${i}`} className="px-2 select-none cursor-default w-fit">
          ...
        </li>
      );
    }

    return (
      <li
        key={p}
        className={`px-3 py-1 border rounded-2xl cursor-pointer w-12 text-center ${
          isActive(p) ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => setPage(p)}
      >
        {p}
      </li>
    );
  };

  return (
    <div className="flex items-center gap-2 mt-6 mb-2 justify-center w-[1200px] ">
      <div className="w-12">
        {page > 1 && (
          <button onClick={prevBlog} className="p-2 border rounded-2xl">
            {"<<<"}
          </button>
        )}
      </div>

      <ul className="flex gap-2">
        {getPageNumbers().map((p, i) => renderPage(p, i))}
      </ul>

      <div className="w-12">
        {page < totalPages && (
          <button onClick={nextBlog} className="p-2 border rounded-2xl">
            {">>>"}
          </button>
        )}
      </div>
    </div>
  );
};
