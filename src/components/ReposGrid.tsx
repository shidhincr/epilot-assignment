import { Link, useAsyncValue } from "react-router-dom";
import { Line } from "./Line";
import type { Repo } from "../types";

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

export const ReposGrid = () => {
  const repos = useAsyncValue() as Repo[];
  if (repos.length === 0) {
    return <div>No repos</div>;
  }

  return (
    <div
      className="grid grid-cols-3 gap-10 overflow-y-scroll flex-grow h-full "
      data-testid="repos"
    >
      {repos?.map((repo) => (
        <div
          className="flex gap-2 shadow-lg h-[150px] border rounded overflow-hidden"
          key={repo.id}
        >
          <div className="bg-gray-200 min-w-[20px]">&nbsp;</div>
          <div className="flex flex-col justify-start py-2 w-full">
            <Link to={repo.html_url} target="_blank">
              <div className="w-auto text-pink-500 pb-2 font-semibold">
                {repo.name}
              </div>
            </Link>
            <div className="w-fit text-slate-700 text-sm line-clamp-3 mb-2 flex-grow">
              {repo.description}
            </div>
            <div className="min-h-[20px] flex gap-4 text-slate-500 text-sm font-bold justify-end px-5 mb-2">
              <span className="flex gap-2">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {repo.stargazers_count}
              </span>
              <span className="flex">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z"
                    fill="currentColor"
                  />
                </svg>
                {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
