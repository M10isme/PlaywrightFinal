import { Element } from "../core/elements/element";
import { LoginModel } from "../models/account-dto";

export class LoginPage {
    emailTextbox: Element;
    passwordTextbox: Element;
    loginButton: Element;

    constructor() {
        this.emailTextbox = new Element("input[name='email']");
        this.passwordTextbox = new Element("input[name='password']");
        this.loginButton = new Element("button[value='Login']");
    }

    async login(loginInfo: LoginModel) {
        await this.emailTextbox.fillText(loginInfo.email!);
        await this.passwordTextbox.fillText(loginInfo.password!);
        await this.loginButton.waitForElementToBeVisible();
        await this.loginButton.click();
    }
}