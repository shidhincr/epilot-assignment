import { Link } from "react-router-dom";
import { User } from "../types";

type SearchResultsProps = {
  users: { items: User[] };
  isLoading?: boolean;
  initialQuery?: string;
};

export const SearchResults = ({
  users,
  isLoading,
  initialQuery,
}: SearchResultsProps) => {
  if (!isLoading && users?.items?.length > 0) {
    return (
      <div className="bg-slate-200 mt-2 p-3 max-h-96 overflow-y-scroll rounded shadow-2xl">
        <ul data-testid="search-results">
          {users?.items?.map((user: User) => (
            <li
              key={user.id}
              data-testid="user-card"
              className="p-2 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Link to={`/user/${user.login}`}>
                <div className="flex items-center gap-3">
                  <img src={user.avatar_url} className="w-8 h-8 rounded-2xl" />
                  <span>{user.login}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (!isLoading && initialQuery && users?.items?.length === 0) {
    return (
      <div className="bg-slate-200 mt-2 p-3 max-h-96 overflow-y-scroll rounded shadow-2xl text-center text-sm text-slate-600">
        No results
      </div>
    );
  }
};
