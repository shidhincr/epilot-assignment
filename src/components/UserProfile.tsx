import type { ReactNode } from "react";
import { Link, useAsyncValue } from "react-router-dom";
import { User } from "../types";
import { Line } from "./Line";

const UserProfileContainer = ({
  testId,
  children,
  className,
}: {
  testId: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center flex-1 mt-10 px-5 ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export const UserProfile = () => {
  const user = useAsyncValue() as User;
  return (
    <UserProfileContainer testId="user-profile">
      <div>
        <img src={user?.avatar_url} className="w-40 rounded-full" />
      </div>
      <div className="flex pt-10 flex-col gap-1">
        <div className="text-blue-800 font-bold">{user?.name}</div>
        <div className="text-blue-800 text-sm">{user?.location}</div>
        <div className="text-blue-800 underline">
          <Link to={user?.html_url} target="_blank">
            @{user?.login}
          </Link>
        </div>
        <div className="text-slate-800 pt-5 flex gap-4">
          <span>Followers:</span>
          {user?.followers}
        </div>
        <div className="text-slate-800 flex gap-4">
          <span>Total repos:</span>
          {user?.public_repos}
        </div>
      </div>
    </UserProfileContainer>
  );
};

export const UserProfileSkeleton = () => {
  return (
    <UserProfileContainer
      className="animate-pulse "
      testId="user-profile-skeleton"
    >
      <div className="w-40 h-40 rounded-full bg-gray-200">&nbsp;</div>
      <div className="flex pt-10 flex-col gap-2">
        <Line width={100} height={20} />
        <Line width={100} height={20} />
        <Line width={100} height={20} />
        <Line width={100} height={20} />
      </div>
    </UserProfileContainer>
  );
};
