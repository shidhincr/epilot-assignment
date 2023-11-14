import ky from "ky";

const api = ky.create({
  prefixUrl: "https://api.github.com/",
});

const getUsers = async ({ query }) => {
  return await api.get(`search/users?q=${query} in:name`).json();
};
const getUserDetails = async ({ id }) => {};
const getRepositories = async () => {};

export default {
  getUsers,
  getUserDetails,
  getRepositories,
};
