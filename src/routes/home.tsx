import { useEffect, useState } from "react";
import api from "../lib/api";
import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";

type User = {
  id: number;
};

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const users = query ? await api.getUsers({ query }) : [];
  return { users, query };
}

export default function Home() {
  const { users, query: urlQuery } = useLoaderData();
  const [disabled, setDisabled] = useState(false);
  const [query, setQuery] = useState(urlQuery || "");
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.length === 0 || isLoading) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [query, navigation.state]);

  return (
    <div className="container max-w-lg">
      <div className="bg-white rounded-lg p-1">
        <Form className="flex gap-5 justify-between">
          <input
            type="text"
            data-testid="search-box"
            onChange={handleOnchange}
            defaultValue={query}
            name="query"
            placeholder="Search for Github users"
            className="flex-1 outline-none p-2 rounded"
            autoFocus
          />
          <button
            type="submit"
            data-testid="search-button"
            disabled={disabled}
            className="bg-blue-500 text-sky-50 text-sm min-w-[100px] rounded"
          >
            {isLoading ? (
              <span data-testid="loading-spinner">loading...</span>
            ) : (
              "Search"
            )}
          </button>
        </Form>
      </div>
      {!isLoading && users?.items?.length > 0 && (
        <div className="bg-slate-200 mt-2 p-3 max-h-96 overflow-y-scroll rounded shadow-2xl">
          <ul data-testid="search-results">
            {users?.items?.map((user) => (
              <li
                key={user.id}
                data-testid="user-card"
                className="p-2 hover:bg-gray-100 hover:cursor-pointer"
              >
                <Link to={`/user/${user.login}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar_url}
                      className="w-8 h-8 rounded-2xl"
                    />
                    <span>{user.login}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isLoading && urlQuery && users?.items?.length === 0 && (
        <div className="bg-slate-200 mt-2 p-3 max-h-96 overflow-y-scroll rounded shadow-2xl text-center text-sm text-slate-600">
          No results
        </div>
      )}
    </div>
  );
}
