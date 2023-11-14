import ky from "ky";
// import dummyReposJSON from "./dummy-repos.json";

const api = ky.create({
  prefixUrl: "https://api.github.com/",
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
