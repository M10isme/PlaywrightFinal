import { test as baseTest } from "../core/fixture/base-fixture";
import { BasePage } from '../pages/base-page';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { ProfilePage } from "../pages/profile-page";

export type PageFixtureType = {
    basePage: BasePage;
    homePage: HomePage;
    loginPage: LoginPage;
    profilePage: ProfilePage;

};

type ExtendParams = Parameters<typeof baseTest.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage());
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage());
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage());
    }
};

export const testPage = baseTest.extend<PageFixtureType>(pageFixture);
export const expectPage = baseTest.expect;
