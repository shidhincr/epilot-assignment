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

const getUsers = async ({ query }) => {
  return await api.get(`search/users?q=${query}`).json();
};
const getUserDetails = async ({ username }) => {
  return await api.get(`users/${username}`).json();
};
const getRepositories = async ({ username }) => {
  return await api.get(`users/${username}/repos`).json();
};

export default {
  getUsers,
  getUserDetails,
  getRepositories,
};
