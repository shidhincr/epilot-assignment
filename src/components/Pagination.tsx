import { useAsyncValue } from "react-router-dom";
import { User } from "../types";
import { useEffect, useState } from "react";

type PaginationProps = {
  page: number;
  onPageChange?: (page: number) => void;
};

export const Pagination = ({ page = 1, onPageChange }: PaginationProps) => {
  const user = useAsyncValue() as User;
  const totalPages = Math.ceil(Number(user.public_repos) / 30);
  const activeClass = `border-b-2 border-b-pink-300 font-bold text-pink-600`;
  const [currentPage, setCurrentPage] = useState(page);
  if (totalPages < 2) {
    return null;
  }

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage !== page) {
      onPageChange?.(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="flex gap-5 pb-5" data-testid="pagination">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          onClick={() => changePage(idx + 1)}
          className={`w-8 h-8 text-sm flex items-center justify-center ${
            currentPage === idx + 1 ? activeClass : ""
          } `}
          key={idx}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};
