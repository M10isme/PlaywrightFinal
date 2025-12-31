import { Element, LocatorType } from "../core/elements/element";


export class ProfilePage {
    editButton: Element;
    usernameTextbox: Element;
    updateButton: Element;
    fullNameText: Element;
    numberOfLikesText: Element;
    displayedLikedPhoto: Element;
    avatarImage: Element;
    photographerName: Element;
    emailButton: Element;
    moreActionsButton: Element;
    introductionText: Element;
    photosTab: Element;
    collectionsTab: Element;
    collectionCard: Element;
    collectionPhotos: Element;

    constructor() {
        this.avatarImage = new Element("div[data-testid = 'users-route'] img[alt*='Avatar']");
        this.photographerName = new Element("div[class*='FdAJI']");
        this.emailButton = new Element("a[title *='Message']");
        this.moreActionsButton = new Element("button[aria-label *='More Actions']");
        this.introductionText = new Element("div.dM4Rz");
        this.photosTab = new Element("a[data-testid='user-nav-link-photos']");
        this.collectionsTab = new Element("a[data-testid='user-nav-link-collections']");
        this.editButton = new Element("Edit profile", LocatorType.TEXT, { exact: false });
        this.usernameTextbox = new Element("#user_username");
        this.updateButton = new Element("input[value = 'Update account']");
        this.fullNameText = new Element("div[class*='FdAJI']");
        this.numberOfLikesText = new Element("a[data-testid = 'user-nav-link-likes'] span");
        this.displayedLikedPhoto = new Element("a[itemprop = 'contentUrl']");
        this.collectionCard = new Element("a[class*='_2WUd']");
        this.collectionPhotos = new Element("figure[data-testid='asset-grid-masonry-figure']");
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

    async isPhotographerProfileIsDisplayed(): Promise<boolean> {
        const elements = [
            this.avatarImage,
            this.photographerName,
            this.emailButton,
            this.moreActionsButton,
            this.introductionText,
            this.photosTab,
            this.collectionsTab
        ];

        const results = await Promise.allSettled(
            elements.map(element => element.isVisible())
        );

        return results.every(result => result.status === 'fulfilled');
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
    async goToCollectionsTab() {
        await this.collectionsTab.waitForElementToBeVisible();
        await this.collectionsTab.click();
    }

    async openCollection(collectionName: string) {
        const collectionElement = new Element(collectionName, LocatorType.TEXT, { exact: false });
        await collectionElement.waitForElementToBeVisible(10000);
        await collectionElement.click();
    }

    async getNumberOfPhotosInCollection(): Promise<number> {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const count = await this.collectionPhotos.getElement().count();
        return count;
    }

    async removeAllPhotosFromCollection() {
        const moreOptionsButton = new Element("button[title='More options']");
        const removeButton = new Element("button", LocatorType.TEXT, { exact: false });
        const photoCount = await this.collectionPhotos.getElements();
        for (let i = 0; i < photoCount; i++) {
            await this.collectionPhotos.clickWithIndex(0);
            await moreOptionsButton.waitForElementToBeVisible();
            await moreOptionsButton.click();
            const removeFromCollectionButton = new Element("Remove from collection", LocatorType.TEXT, { exact: false });
            await removeFromCollectionButton.waitForElementToBeVisible();
            await removeFromCollectionButton.click();
            const closeButton = new Element("button[aria-label='Close']");
            await closeButton.waitForElementToBeVisible();
            await closeButton.click();
        }
    }
}