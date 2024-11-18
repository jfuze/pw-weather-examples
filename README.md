# pw-weather-examples
A few short tests and simple playwright framework exercising weather.com's search functionality

## Setup and running the tests
Make sure you've got node/npm installed! Then run `npm install` after pulling down the project and `npm run verify` to set up playwright and its browsers locally. Afterwards you can run `npm test` which will fire off the 4 tests on 3 browsers (12 total tests), or you can run `npm run test:chrome` if you want to quickly execute the 4 tests. Both included scripts will run the tests headlessly and then open playwright's built in reporter.

One of the test files `search-test-that-fails.spec.ts` _will_ fail! Don't be alarmed if it does. There are comments on why inside the test file.

## Caveats

There are two test files, `search-by-location-data-driven.spec.ts` and `search-by-location.spec.ts` which contain the same tests written in different ways. The data-driven approach is appropriate if the tests are the _exact same_ in their assertions, where the other is likely preferable if there are differences (so we don't get into a bunch of conditionals).

Sometimes weather.com times out entirely on a first run (hence the 2 minute global timeout), if that happens try terminating the reporter and running the tests again.

Weather.com is pretty riddled with ads, some of which may slow the test browser to a crawl if it's left open or run repeatedly. If you run the tests in headed mode (the included scripts don't), closing the browser before running the tests again is advisable.
