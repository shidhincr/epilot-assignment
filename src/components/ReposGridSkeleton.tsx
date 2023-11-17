import { Line } from "./Line";

export const ReposGridSkeleton = () => {
  return (
    <div
      className="grid grid-cols-3 animate-pulse gap-20 mt-10"
      data-testid="repos-skeleton"
    >
      {Array.from({ length: 11 }).map((_, index) => (
        <div className="flex gap-5 max-h-[100px]" key={index}>
          <div className="bg-gray-200 w-[100px]">&nbsp;</div>
          <div className="space-y-4">
            <Line width="200px" height="3" />
            <Line width="100px" height="3" />
            <Line width="200px" height="3" />
            <Line width="150px" height="3" />
          </div>
        </div>
      ))}
    </div>
  );
};
