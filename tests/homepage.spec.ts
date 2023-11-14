import { test, expect, Locator } from "@playwright/test";
import { HomePage } from "./pom/home-page";

test.describe("Homepage", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.load();
  });

  test("the search box and button", async ({ page }) => {
    // Expect the search box and button
    expect(homePage.searchBox).toBeVisible();
    expect(homePage.searchButton).toBeVisible();
    // Expect the search box is disabled until some text is entered
    expect(homePage.searchButton).toBeDisabled();
    await homePage.searchBox.fill("test");
    expect(homePage.searchButton).not.toBeDisabled();
  });

  test("the search results", async ({ page }) => {
    const { responsePromise } = await homePage.search("shidhin");
    expect(homePage.loadingSpinner).toBeVisible();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(homePage.loadingSpinner).not.toBeVisible();
    expect(homePage.searchResults).toBeVisible();
    const results = await page.getByTestId("user-card").all();
    const responseData = await response.json();
    expect(results.length).toEqual(responseData?.items?.length);
  });

  test("the navigation", async ({ page }) => {
    await homePage.search("shidhin");
    const firstUser = await page.getByTestId("user-card").first();
    await firstUser.click();
    await page.waitForURL("**/user/**");
  });
});
