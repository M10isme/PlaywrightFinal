import { Element, LocatorType } from "../core/elements/element";
import { ProfilePage } from "./profile-page";

export class HomePage {
    secondPicture: Element;
    avtIcon: Element;
    viewProfileButton: Element;
    logoutButton: Element;
    avatarImage: Element;
    photographerName: Element;
    emailButton: Element;
    moreActionsButton: Element;
    introductionText: Element;
    photosTab: Element;
    likesTab: Element;
    collectionsTab: Element;
    profileIcon: Element;

    constructor() {
        this.secondPicture = new Element("figure[data-masonryposition='2']");
        this.avtIcon = new Element("div[data-testid='photos-route'] header img");
        this.viewProfileButton = new Element("View profile", LocatorType.TEXT, { exact: true });
        this.logoutButton = new Element("Logout", LocatorType.TEXT, { exact: false });
        this.avatarImage = new Element("div[data-testid = 'users-route'] img[alt*='Avatar']");
        this.photographerName = new Element("div[class*='FdAJI']");
        this.emailButton = new Element("a[title *='Message']");
        this.moreActionsButton = new Element("button[aria-label *='More Actions']");
        this.introductionText = new Element("div.dM4Rz");
        this.photosTab = new Element("a[data-testid='user-nav-link-photos']");
        this.likesTab = new Element("a[data-testid='user-nav-link-likes']");
        this.collectionsTab = new Element("a[data-testid='user-nav-link-collections']");
        this.profileIcon = new Element("button img[alt*='Avatar of user']");

    }

    async goToPhotographerProfilePage(): Promise<HomePage> {
        await this.avtIcon.hover();
        await this.viewProfileButton.click();
        return new HomePage();
    }

    async clickSecondPicture() {
        await this.secondPicture.clickWithIndex(0);
        await this.avtIcon.waitForElementToBeVisible();
    }

    async isPhotographerProfileIsDisplayed(): Promise<boolean> {
        const elements = [
            this.avatarImage,
            this.photographerName,
            this.emailButton,
            this.moreActionsButton,
            this.introductionText,
            this.photosTab,
            this.likesTab,
            this.collectionsTab
        ];

        const results = await Promise.allSettled(
            elements.map(element => element.isVisible())
        );

        return results.every(result => result.status === 'fulfilled');
    }

    async goToProfilePage(): Promise<ProfilePage> {
        await this.profileIcon.click();
        await this.viewProfileButton.click();
        return new ProfilePage();
    }

    async logout(): Promise<HomePage> {
        await this.profileIcon.click();
        await this.logoutButton.click();
        return new HomePage();
    }
}