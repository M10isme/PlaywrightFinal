export interface Account {
    email: string;
    password: string;
    fullName?: string;
    accessToken?: string;
}

export class LoginModel {
    email: string;
    password: string;
    fullname: string;
    constructor(email, password, fullname) {
        this.email = email;
        this.password = password;
        this.fullname = fullname;
    }

    static fromJson(json) {
        return new LoginModel(json.email, json.password, json.fullname);
    }
}