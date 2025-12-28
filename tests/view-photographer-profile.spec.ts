import { USER_DATA } from "../data/user-data";
import { expect, test } from "../hooks/hook";
import { LoginModel } from "../models/account-dto";

test('View photographer profile successfully', async ({ page, basePage, homePage }) => {
    const loginData = LoginModel.fromJson(USER_DATA.valid_user_01);
    const loginPage = await basePage.goToLoginPage();
    await loginPage.login(loginData);

    await homePage.clickSecondPicture();
    await homePage.goToPhotographerProfilePage();

    const isDisplayed = await homePage.isPhotographerProfileIsDisplayed();
    expect(isDisplayed).toBeTruthy();
});

