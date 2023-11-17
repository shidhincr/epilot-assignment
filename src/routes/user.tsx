import { Await, defer, useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import api from "../lib/api";
import { Suspense } from "react";
import type { Repo, User } from "../types/";
import { UserProfile, UserProfileSkeleton } from "../components/UserProfile";
import { ReposGrid } from "../components/ReposGrid";
import { ReposGridSkeleton } from "../components/ReposGridSkeleton";
import { Pagination } from "../components/Pagination";
type UserLoaderData = {
  userPromise: Promise<User>;
  reposPromise: Promise<Repo[]>;
};

export async function loader({ params }: LoaderFunctionArgs) {
  // const userPromise = new Promise((resolve) => null);
  // const reposPromise = new Promise((resolve) => null);
  const userPromise = api.getUserDetails({ username: params.username });
  const reposPromise = api.getRepositories({ username: params.username });
  return defer({ userPromise, reposPromise });
}

const ErrorMessage = ({ message = "Error" }) => {
  return <p className="text-red-600 flex justify-center">{message}</p>;
};

export default function User() {
  const data = useLoaderData() as UserLoaderData;
  return (
    <div className="bg-white p-5 rounded shadow-2xl flex w-full overflow-hidden">
      <div className="grid grid-cols-[200px_1fr] gap-10 items-start w-full">
        <Suspense fallback={<UserProfileSkeleton />}>
          <Await
            resolve={data.userPromise}
            errorElement={<ErrorMessage message="Error loading user details" />}
          >
            <UserProfile />
          </Await>
        </Suspense>
        <Suspense fallback={<ReposGridSkeleton />}>
          <Await
            resolve={data.reposPromise}
            errorElement={<ErrorMessage message="Error loading repos" />}
          >
            <div className="h-screen pb-10">
              <Pagination page={1} total={5} />
              <ReposGrid />
            </div>
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
