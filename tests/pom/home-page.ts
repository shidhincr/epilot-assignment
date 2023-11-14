import { Locator } from "@playwright/test";

const BASE_URL = "localhost:5173";

export class HomePage {
  searchBox: Locator;
  searchButton: Locator;
  loadingSpinner: Locator;
  searchResults: Locator;

  constructor(private page: Page) {}

  async load() {
    await this.page.goto(BASE_URL);
    this.searchBox = await this.page.getByTestId("search-box");
    this.searchButton = await this.page.getByTestId("search-button");
    this.loadingSpinner = await this.page.getByTestId("loading-spinner");
    this.searchResults = await this.page.getByTestId("search-results");
  }
  async search(query: string) {
    // show the loading spinner when search button is clicked or enter is pressed
    // and hide it when the search results are loaded
    await this.searchBox.fill(query);
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes(`/users?q=${query}`),
    );
    await this.searchButton.click();
    return { responsePromise };
  }
}
