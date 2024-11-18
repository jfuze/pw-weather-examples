import { test, expect } from '../fixtures/page-objects';
import { TodayPage } from '../pages/today-page';

// we'd ultimately use a library to generate geo data so we're not always using the same location
const location = {
  city: 'Franklin',
  cityAndState: 'Franklin, TN',
  zip: '37067'
};

test.describe('Search tests', async () => {
    test.beforeEach(async ({ todayPage }) => {
        // see comment in base-page.ts
        await todayPage.goToHomePage();
    });

    test('User can search by city name and view todays weather', async ({ todayPage }) => {
        await test.step('Search by location identifier', async () => {
            await todayPage.inputLocationSearch.fill(location.city);
            // we can explicitly assert for visibility here, but playwright won't click if it's not visible
            await todayPage.buttonSelectSearchLocation.getByText(location.cityAndState).click();
            // await verifyTodaysWeather(todayPage);
        });
        await test.step('Verify weather data is displayed for location', async () => await verifyTodaysWeather(todayPage))
    });

    test('User can search by zip code and view todays weather', async ({ todayPage }) => {
        await test.step('Search by location identifier', async () => {
            await todayPage.inputLocationSearch.fill(location.zip);
            await todayPage.buttonSelectSearchLocation.getByText(location.cityAndState).click();
        });
        await test.step('Verify weather data is displayed for location', async () => await verifyTodaysWeather(todayPage))
    });

    test('User can search by city + state and view todays weather', async ({ todayPage }) => {
        await test.step('Search by location identifier', async () => {
            await todayPage.inputLocationSearch.fill(location.cityAndState);
            await todayPage.buttonSelectSearchLocation.getByText(location.cityAndState).click();
        });
        await test.step('Verify weather data is displayed for location', async () => await verifyTodaysWeather(todayPage))
    });
});

const verifyTodaysWeather = async (todayPage: TodayPage) => {
    await expect(todayPage.page.url()).toContain('/today');
    await expect(todayPage.headerTodaysTemp).toHaveText(location.cityAndState);
    await expect(todayPage.cardSavedLocations).toContainText(location.cityAndState);
    // these assertions are a little simple but could be enhanced with more business knowledge
    await expect(todayPage.textCurrentTemp).toBeVisible();
    await expect(todayPage.textTodaysTempRange).toHaveCount(2);
    for (const temp of await todayPage.textTodaysTempRange.all()) {
        await expect(temp).not.toBeEmpty();
    }
}
