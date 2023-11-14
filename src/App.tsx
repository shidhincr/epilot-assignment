import { useEffect, useState } from "react";
import "./App.css";
import api from "./lib/api";
import { Link, Outlet } from "react-router-dom";

type User = {
  id: number;
};

function App() {
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const startSearch = async () => {
    try {
      setLoading(true);
      const githubUsers: User[] = await api.getUsers({ query });
      setLoading(false);
      setUsers(githubUsers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [query]);

  return (
    <div>
      <input type="text" data-testid="search-box" onChange={handleOnchange} />
      <button
        data-testid="search-button"
        disabled={disabled}
        onClick={startSearch}
      >
        Search
      </button>
      {loading && <div data-testid="loading-spinner">loading...</div>}
      {users?.items?.length > 0 && (
        <ul data-testid="search-results">
          {users?.items?.map((user) => (
            <li key={user.id} data-testid="user-card">
              <Link to={`/user/${user.login}`}>{user.login}</Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
}

export default App;
