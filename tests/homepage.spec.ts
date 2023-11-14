import { test, expect, Locator } from "@playwright/test";

test.describe("Homepage", () => {
  let searchBox: Locator;
  let searchButton: Locator;
  let loadingSpinner: Locator;
  let searchResults: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("localhost:5173");
    searchBox = await page.getByTestId("search-box");
    searchButton = await page.getByTestId("search-button");
    loadingSpinner = await page.getByTestId("loading-spinner");
    searchResults = await page.getByTestId("search-results");
  });

  test("the search box and button", async ({ page }) => {
    // Expect the search box and button
    expect(searchBox).toBeVisible();
    expect(searchButton).toBeVisible();
    // Expect the search box is disabled until some text is entered
    expect(searchButton).toBeDisabled();
    await searchBox.fill("test");
    expect(searchButton).not.toBeDisabled();
  });

  test("the search results", async ({ page }) => {
    // show the loading spinner when search button is clicked or enter is pressed
    // and hide it when the search results are loaded
    await searchBox.fill("shidhin");
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes("/users"),
    );

    await searchButton.click();
    expect(loadingSpinner).toBeVisible();
    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(loadingSpinner).not.toBeVisible();
    expect(searchResults).toBeVisible();
    const results = await page.getByTestId("user-card").all();
    const responseData = await response.json();
    expect(results.length).toEqual(responseData?.items?.length);
  });

  test("the navigation", async ({ page }) => {
    await searchBox.fill("shidhin");
    await searchButton.click();
    expect(searchResults).toBeVisible();
    const firstUser = await page.getByTestId("user-card").first();
    await firstUser.click();
    await page.waitForURL("**/user/**");
  });
});
