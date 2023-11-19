import { Locator, Page } from "@playwright/test";

const BASE_URL = "localhost:5173/user/";

export class UserPage {
  userProfileSkeleton: Locator;
  reposSkeleton: Locator;
  userProfile: Locator;
  repos: Locator;
  pagination: Locator;
  promises: Record<string, Promise<any>>;

  constructor(private page: Page) { }

  async load({ username }) {
    const userDataPromise = this.page.waitForResponse(
      (response) =>
        response.url().includes(`/users/`) && response.status() === 200,
    );
    const repoListPromise = this.page.waitForResponse(
      (response) =>
        response.url().includes(`/repos`) && response.status() == 200,
    );
    await this.page.goto(BASE_URL + username);
    this.userProfileSkeleton = await this.page.getByTestId(
      "user-profile-skeleton",
    );
    this.reposSkeleton = await this.page.getByTestId("repos-skeleton");
    this.userProfile = await this.page.getByTestId("user-profile");
    this.repos = await this.page.getByTestId("repos");
    this.pagination = await this.page.getByTestId("pagination");

    this.promises = { userDataPromise, repoListPromise };
  }

  async resolvePromises() {
    if (this.promises) {
      await Promise.all(Object.values(this.promises));
      await this.page.waitForTimeout(5000);
    }
  }
  async selectRepo(index: number) {
    // click on the desired page number
  }
  async changePage(page: number) {
    // click on the desired page number
    await this.pagination.locator("button").nth(page).click();
  }
}
