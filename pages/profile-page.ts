import { Element, LocatorType } from "../core/elements/element";


export class ProfilePage {
    editButton: Element;
    usernameTextbox: Element;
    updateButton: Element;
    fullNameText: Element;
    numberOfLikesText: Element;
    displayedLikedPhoto: Element;

    constructor() {
        this.editButton = new Element("Edit profile", LocatorType.TEXT, { exact: false });
        this.usernameTextbox = new Element("#user_username");
        this.updateButton = new Element("input[value = 'Update account']");
        this.fullNameText = new Element("div[class*='FdAJI']");
        this.numberOfLikesText = new Element("a[data-testid = 'user-nav-link-likes'] span");
        this.displayedLikedPhoto = new Element("a[itemprop = 'contentUrl']");
    }

    async updateUsername(username: string) {
        await this.editButton.click();
        await this.usernameTextbox.fillText(username);
        await this.updateButton.click();
    }

    async getUsername(): Promise<string> {
        await this.editButton.click();
        await this.usernameTextbox.waitForElementToBeVisible();
        return await this.usernameTextbox.getElement().inputValue() || "";
    }

    async getFullName(): Promise<string> {
        await this.fullNameText.waitForElementToBeVisible();
        return await this.fullNameText.getElement().textContent() || "";
    }

    async getNumberOfLikes(): Promise<number> {
        await this.numberOfLikesText.waitForElementToBeVisible();
        const text = await this.numberOfLikesText.getElement().textContent() || "";

        const likes = parseInt(text.replace(/[^\d]/g, ''), 10);
        return isNaN(likes) ? 0 : likes;
    }

    async getNumberOfDisplayedLikedPhotos(): Promise<number> {
        return await this.displayedLikedPhoto.getElements();
    }
}