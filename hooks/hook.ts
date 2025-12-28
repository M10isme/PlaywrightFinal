import { DataStorage } from "../core/share-data/data-storage";
import { expectMain, requestMain, testMain } from "../fixtures/main-fixture";

export const test = testMain;
export const request = requestMain;
export const expect = expectMain;

test.beforeAll(async () => {
    console.log('Before Test');
});

test.beforeEach('Go to Unsplash', async ({ basePage }) => {
    console.log(`Running ${test.info().title} test`);
    DataStorage.initializeDataStorage();
    await basePage.goToHomePage();
});

test.afterEach('After Test', async () => {
    console.log(`${test.info().title} with status ${test.info().status}`);
});

test.afterAll(async () => {
    DataStorage.clearData();
    console.log('After All tests');
});
