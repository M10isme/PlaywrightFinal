import { API_ENDPOINTS, BASE_URL } from "../constants/endpoint-constants";
import { HomePage } from "./home-page";
import { LoginPage } from "./login-page";
import { ProfilePage } from "./profile-page";

export class BasePage {

    constructor(protected readonly page) {
        this.page = page;
    }

    async goToHomePage(): Promise<HomePage> {
        await this.page.goto(BASE_URL);
        return new HomePage();
    }

    async goToUserProfilePage(username: string): Promise<ProfilePage> {
        await this.page.goto(BASE_URL + API_ENDPOINTS.USER.PROFILE(username));
        return new ProfilePage();
    }

    async goToLoginPage(): Promise<LoginPage> {
        await this.page.goto(BASE_URL + API_ENDPOINTS.AUTH.LOGIN);
        return new LoginPage();
    }
}
