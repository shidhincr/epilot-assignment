import { Locator, Page } from "@playwright/test";

const BASE_URL = "localhost:5173/user/shidhincr";

export class UserPage {
  userProfileSkeleton: Locator;
  reposSkeleton: Locator;
  userProfile: Locator;
  repos: Locator;
  pagination: Locator;

  constructor(private page: Page) {}

  async load() {
    const userDataPromise = this.page.waitForResponse((response) =>
      response.url().includes(`/users/`),
    );
    // const repoListPromise = this.page.waitForResponse((response) =>
    //   response.url().includes(`/repos`),
    // );
    await this.page.goto(BASE_URL);
    this.userProfileSkeleton = await this.page.getByTestId(
      "user-profile-skeleton",
    );
    this.reposSkeleton = await this.page.getByTestId("repos-skeleton");
    this.userProfile = await this.page.getByTestId("user-profile");
    this.repos = await this.page.getByTestId("repos");
    this.pagination = await this.page.getByTestId("pagination");

    return { userDataPromise };
  }
  async selectRepo(index: number) {
    // click on the desired page number
  }
  async changePage(page: string) {
    // click on the desired page number
  }
}
