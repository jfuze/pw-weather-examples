import { test, expect } from '../fixtures/page-objects';
import { TodayPage } from '../pages/today-page';

// we'd ultimately use a library to generate geo data so we're not always using the same location
const testData = [
  { id: 'city', input: 'Franklin', location: 'Franklin, TN' },
  { id: 'city and state', input: 'Franklin, TN', location: 'Franklin, TN' },
  { id: 'zip', input: '37067', location: 'Franklin, TN' }
];

test.describe('Search tests', {tag: ['@regression', '@search']}, async () => {
  test.beforeEach(async ({ todayPage }) => {
    // see comment in base-page.ts
    await todayPage.goToHomePage();
  });

  // these examples share all the same assertions so we can go data-driven
  // we could also test the search input mapping at a lower level (not end-to-end) if we wanted to
  testData.forEach(({ id, input, location }) => {
    test(`User can search by ${id} and view todays weather`, async ({ todayPage }) => {
      // using .step here just to format the report, it's not necessary
      await test.step(`Search by ${id} identifier`, async () => {
        await todayPage.inputLocationSearch.fill(input);
        // we can explicitly assert for visibility here, but playwright won't click if it's not visible
        await todayPage.buttonSelectSearchLocation.getByText(location).click();
      });

      await test.step('Verify weather data is displayed for location', async () => await verifyTodaysWeather(todayPage))
    });
  });
});

const verifyTodaysWeather = async (todayPage: TodayPage, location = 'Franklin, TN') => {
  await expect(todayPage.page.url()).toContain('/today');
  await expect(todayPage.headerTodaysTemp).toHaveText(location);
  await expect(todayPage.cardSavedLocations).toContainText(location);
  // these assertions are a little simple but could be enhanced with more business knowledge
  await expect(todayPage.textCurrentTemp).toBeVisible();
  await expect(todayPage.textTodaysTempRange).toHaveCount(2);
  for (const temp of await todayPage.textTodaysTempRange.all()) {
    await expect(temp).not.toBeEmpty();
  }
}