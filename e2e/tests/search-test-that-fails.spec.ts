import { test, expect } from '../fixtures/page-objects';

test.describe.configure({ retries: 0 })

test('Search results match input (this test should fail)', { tag: '@regression' }, async ({ todayPage }) => {
  await todayPage.goToHomePage();
  await todayPage.inputLocationSearch.fill('Franklin');
  await expect(todayPage.buttonSelectSearchLocation.first()).toBeVisible();
  for (const searchResult of await todayPage.buttonSelectSearchLocation.all()) {
    // this fails because for some reason cities like "austin" or "mississippi" are in the results
    // (for me anyway, this may be partially based on geolocation or VPN/private relay)
    await expect(searchResult).toContainText('Franklin', { timeout: 5000 });
  }
});
