import { faker } from "@faker-js/faker";
import { USER_DATA } from "../data/user-data";
import { expect, test } from "../hooks/hook";
import { LoginModel } from "../models/account-dto";

test('Update profile successfully', async ({ basePage, homePage, profilePage }) => {
    const loginData = LoginModel.fromJson(USER_DATA.valid_user_01);
    const loginPage = await basePage.goToLoginPage();
    await loginPage.login(loginData);

    await homePage.goToProfilePage();

    const newUsername = faker.helpers.slugify(faker.internet.username()).replace(/[^a-zA-Z0-9_]/g, '');
    await profilePage.updateUsername(newUsername);

    await basePage.goToUserProfilePage(newUsername);

    const expectedFullName = USER_DATA.valid_user_01.fullname;
    const actualFullName = await profilePage.getFullName();

    expect(actualFullName.trim()).toBe(expectedFullName);
});

