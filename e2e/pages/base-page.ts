import { Locator, Page } from '@playwright/test';

export class BasePage {
  // the "search" functionality appears to be shared across most pages. If it turned out not to be, this
  // could just be a "SearchPage" class that other pages extend from instead
  readonly inputLocationSearch: Locator;
  readonly listLocationSearchResults: Locator;
  readonly buttonSelectSearchLocation: Locator;
  readonly cardSavedLocations: Locator;

  constructor(public page: Page) {
    // I tend to lean towards more "human" or accessibility selectors when possible, but this is a bit
    // of a judgement call and will ultimately depend on which selectors are most stable
    this.inputLocationSearch = page.getByLabel('Search City or Zip Code');
    this.listLocationSearchResults = page.locator('#LocationSearch_listbox');
    this.buttonSelectSearchLocation = this.listLocationSearchResults.locator('[data-testid="ctaButton"]');
    this.cardSavedLocations = page.locator('[aria-label="Saved Locations"] [class*="styles--LocationCardComponent"]');
  }

  // this can live in a base class, or we could add a "helpers" or "common actions" class/fixture with some
  // shared functions if we don't like the way this reads in the tests, or if some pages don't extend the base
  async goToHomePage() {
    // this waitUntil is a hack because weather.com has a LOT of ads
    await this.page.goto('/', { waitUntil: 'domcontentloaded'});
  }
}
