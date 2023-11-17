type PaginationProps = {
  page: number;
  total: number;
};
export const Pagination = ({ page, total }: PaginationProps) => {
  const activeClass = `border-b-2 border-b-pink-300 font-bold text-pink-600`;
  return (
    <div
      className="flex gap-5 justify-end w-full pb-5"
      data-testid="pagination"
    >
      {Array.from({ length: total }).map((_, idx) => (
        <span
          className={`w-8 h-8 text-sm flex items-center justify-center ${
            page === idx + 1 ? activeClass : ""
          } `}
          key={idx}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
};
