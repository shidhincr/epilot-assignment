import { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

type SearchFormProps = {
  initialQuery?: string;
  isLoading?: boolean;
};

export const SearchForm = ({ initialQuery, isLoading }: SearchFormProps) => {
  const [disabled, setDisabled] = useState(true);
  const [query, setQuery] = useState(initialQuery || "");
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    navigate("/");
  };

  useEffect(() => {
    if (query.length === 0 || isLoading) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [query, isLoading]);

  useEffect(() => {
    searchBoxRef?.current?.focus();
  }, [initialQuery]);

  return (
    <Form className="flex">
      <input
        type="text"
        ref={searchBoxRef}
        data-testid="search-box"
        onChange={handleOnchange}
        value={query}
        name="query"
        placeholder="Search for Github users"
        className="outline-none p-2 rounded"
      />
      <div className="flex gap-4 justify-end flex-grow">
        {query.length > 0 && (
          <span
            onClick={clearQuery}
            className="flex items-center text-slate-500 cursor-pointer"
          >
            &times;
          </span>
        )}
        <button
          type="submit"
          data-testid="search-button"
          disabled={disabled}
          className="bg-blue-500 text-sky-50 text-sm max-w-[100px] flex-1 rounded"
        >
          {isLoading ? (
            <span data-testid="loading-spinner">loading...</span>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </Form>
  );
};
