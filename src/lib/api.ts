import ky from "ky";
// import dummyReposJSON from "./dummy-repos.json";

const headers: Record<string, any> = {};
if (import.meta.env.VITE_GH_TOKEN) {
  headers["Authorization"] = `token ${import.meta.env.VITE_GH_TOKEN}`;
  console.log({ headers });
}

const api = ky.create({
  prefixUrl: "https://api.github.com/",
  headers: {
    ...headers,
  },
});

const getUsers = async ({ query }: { query: string }) => {
  return await api.get(`search/users?q=${query}`).json();
};
const getUserDetails = async ({ username }: { username?: string }) => {
  return await api.get(`users/${username}`).json();
};
const getRepositories = async ({
  username,
  page = "1",
}: {
  username?: string;
  page?: string;
}) => {
  return await api.get(`users/${username}/repos?page=${page}`).json();
};

export default {
  getUsers,
  getUserDetails,
  getRepositories,
};
