import { test, expect } from "@playwright/test";
import { UserPage } from "./pom/user-page";

test.describe("UserPage", () => {
  let userPage: UserPage;

  test.beforeEach(async ({ page }) => {
    userPage = new UserPage(page);
  });

  test("loading skeletons and data", async ({ page }) => {
    // expect the skeletons to be visible
    // after the data is loaded, show the user profile and repos
    const { userDataPromise } = await userPage.load();
    expect(userPage.userProfileSkeleton).toBeVisible();
    expect(userPage.reposSkeleton).toBeVisible();
    await userDataPromise;
    expect(userPage.userProfileSkeleton).not.toBeVisible();
  });

  test("pagination", async ({ page }) => {
    // pagination
  });

  test("the navigation", async ({ page }) => {
    // click on the user profile and see if it opens a new tab
    // click on a repo link and see if it opens a new tab
  });
});
