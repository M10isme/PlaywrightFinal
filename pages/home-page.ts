import { Element, LocatorType } from "../core/elements/element";
import { ProfilePage } from "./profile-page";

export class HomePage {
    secondPicture: Element;
    avtIcon: Element;
    profileIcon: Element;
    viewProfileButton: Element;
    logoutButton: Element;
    randomPhoto: Element;
    photoDialog: Element;
    addToCollectionButton: Element;
    collectionOption: Element;
    closePhotoButton: Element;

    constructor() {
        this.secondPicture = new Element("figure[data-testid='asset-grid-masonry-figure']");
        this.avtIcon = new Element("div[data-testid='photos-route'] header img");
        this.profileIcon = new Element("button img[alt*='Avatar of user']");
        this.viewProfileButton = new Element("View profile", LocatorType.TEXT, { exact: true });
        this.logoutButton = new Element("Logout", LocatorType.TEXT, { exact: false });
        this.randomPhoto = new Element("figure[itemprop='image']");
        this.photoDialog = new Element("div[role='dialog'][data-open]");
        this.addToCollectionButton = new Element("figure[itemprop='image'] button[title='Add to collection']");
        this.collectionOption = new Element("button[title*='collection']");
        this.closePhotoButton = new Element("button[aria-label='Close']");
    }

    async goToPhotographerProfilePage(): Promise<HomePage> {
        await this.avtIcon.waitForElementToBeVisible(5000);
        await this.avtIcon.hover();
        await this.viewProfileButton.waitForElementToBeVisible(5000);
        await this.viewProfileButton.click();
        return new HomePage();
    }

    async clickSecondPicture() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.secondPicture.clickWithIndex(1);
        await this.avtIcon.waitForElementToBeVisible(10000);
    }

    async goToProfilePage(): Promise<ProfilePage> {
        await this.profileIcon.click();
        await this.viewProfileButton.waitForElementToBeVisible(5000);
        await this.viewProfileButton.click();
        return new ProfilePage();
    }

    async logout(): Promise<HomePage> {
        await this.profileIcon.click();
        await this.logoutButton.click();
        return new HomePage();
    }

    async addRandomPhotoToCollection(collectionName: string, photoIndex: number) {
        const page = this.randomPhoto.getElement().page();
        await page.keyboard.press('Escape');
        await new Promise(resolve => setTimeout(resolve, 500));
        const photoElement = this.randomPhoto.getElement().nth(photoIndex);
        await photoElement.hover({ force: true });
        await new Promise(resolve => setTimeout(resolve, 800));
        const addButton = photoElement.locator("button[aria-label='Add to Collection']");
        await addButton.click({ force: true, timeout: 10000 });
        await new Promise(resolve => setTimeout(resolve, 1500));
        const collectionButton = new Element(collectionName, LocatorType.TEXT, { exact: false });
        await collectionButton.waitForElementToBeVisible(10000);
        await collectionButton.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.keyboard.press('Escape');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}