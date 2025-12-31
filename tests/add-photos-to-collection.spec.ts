import { COLLECTION_CONSTANTS } from "../constants/endpoint-constants";
import { USER_DATA } from "../data/user-data";
import { expect, test } from "../hooks/hook";
import { LoginModel } from "../models/account-dto";

test('Add photos to collection successfully', async ({ basePage, homePage, profilePage }) => {
    const loginData = LoginModel.fromJson(USER_DATA.valid_user_01);
    const loginPage = await basePage.goToLoginPage();
    await loginPage.login(loginData);
    await basePage.goToHomePage();
    const numberOfPhotos = COLLECTION_CONSTANTS.NUMBER_OF_PHOTOS_TO_ADD;
    const collectionName = COLLECTION_CONSTANTS.MY_FIRST_COLLECTION;
    for (let i = 0; i < numberOfPhotos; i++) {
        await homePage.addRandomPhotoToCollection(collectionName, i);
    }
    await homePage.goToProfilePage();
    await profilePage.goToCollectionsTab();
    await profilePage.openCollection(collectionName);
    const finalPhotoCount = await profilePage.getNumberOfPhotosInCollection();
    expect(finalPhotoCount).toBe(numberOfPhotos);
});
