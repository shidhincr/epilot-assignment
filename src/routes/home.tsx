import api from "../lib/api";
import { useLoaderData, useNavigation } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { User } from "../types/";
import { SearchForm } from "../components/SearchForm";
import { SearchResults } from "../components/SearchResults";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const users = query ? await api.getUsers({ query }) : [];
  return { users, query };
}

type HomeLoaderData = {
  users: { items: User[] };
  query?: string;
};

export default function Home() {
  const { users, query: urlQuery } = useLoaderData() as HomeLoaderData;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="container max-w-lg">
      <div className="bg-white rounded-lg p-1">
        <SearchForm initialQuery={urlQuery} isLoading={isLoading} />
      </div>
      <SearchResults
        isLoading={isLoading}
        users={users}
        initialQuery={urlQuery}
      />
    </div>
  );
}
