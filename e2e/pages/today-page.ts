import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class TodayPage extends BasePage {
  readonly headerTodaysTemp: Locator;
  readonly textCurrentTemp: Locator;
  readonly textTodaysTempRange: Locator;

  constructor(page: Page) {
    super(page);
    // we're parsing some gnarly selectors here, I'd want to add more stable attributes to the app
    this.headerTodaysTemp = page.locator('h1[class*="CurrentConditions"]');
    this.textCurrentTemp = page.locator('[data-testid="TemperatureValue"][class*="CurrentConditions"]');
    this.textTodaysTempRange = page.locator('[class*="CurrentConditions--tempHiLoValue"] [data-testid="TemperatureValue"]');
  }
}
