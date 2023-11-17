export interface User {
  id: string;
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  followers: string;
  public_repos: string;
  html_url: string;
}

export type Repo = {
  description: string;
  html_url: string;
  stargazers_count: string;
  forks_count: string;
  name: string;
  id: string;
};
