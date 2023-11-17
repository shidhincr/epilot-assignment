import { Link, useAsyncValue } from "react-router-dom";
import { User } from "../types";

type PaginationProps = {
  page: number;
};
export const Pagination = ({ page = 1 }: PaginationProps) => {
  const user = useAsyncValue() as User;
  const totalPages = Math.ceil(Number(user.public_repos) / 30);
  const activeClass = `border-b-2 border-b-pink-300 font-bold text-pink-600`;
  if (totalPages < 2) {
    return null;
  }
  return (
    <div
      className="flex gap-5 justify-end w-full pb-5"
      data-testid="pagination"
    >
      {Array.from({ length: totalPages }).map((_, idx) => (
        <Link
          className={`w-8 h-8 text-sm flex items-center justify-center ${
            page === idx + 1 ? activeClass : ""
          } `}
          key={idx}
          to={`?page=${idx + 1}`}
        >
          {idx + 1}
        </Link>
      ))}
    </div>
  );
};
