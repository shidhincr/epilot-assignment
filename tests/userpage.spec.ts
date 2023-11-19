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
    await userPage.load({
      username: "shidhincr",
    });
    expect(userPage.userProfileSkeleton).toBeVisible();
    expect(userPage.reposSkeleton).toBeVisible();
    await userPage.resolvePromises();
    expect(userPage.userProfileSkeleton).not.toBeVisible();
    expect(userPage.reposSkeleton).not.toBeVisible();
  });

  test("pagination", async ({ page }) => {
    // pagination
    await userPage.load({ username: "shidhincr" });
    await userPage.resolvePromises();
    expect(userPage.pagination).toBeVisible();
    await userPage.changePage(2);
    await page.waitForTimeout(5000);
    expect(userPage.pagination.locator("button").nth(2)).toHaveClass(
      /text-pink-600/,
    );
    expect(page.url()).toContain("/user/shidhincr?page=3");
  });
});
