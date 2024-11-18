import { TodayPage } from '../pages/today-page';
import { test as baseTest } from '@playwright/test';

// eventually we'll have additional pages we want to auto-import
type PageObjects = {
  todayPage: TodayPage;
}

export const test = baseTest.extend<PageObjects>({
  todayPage: async ({ page }, use) => {
    await use(new TodayPage(page));
  }
})

// might as well save one more import while we're at it
export { expect } from '@playwright/test';
