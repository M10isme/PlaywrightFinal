export const BASE_URL: string = "https://unsplash.com";
export const BASE_API_URL: string = "https://api.unsplash.com";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/login",
    },
    USER: {
        CURRENT: "/me",
        PROFILE: (username: string) => `/@${username}`,
        LIKES: (username: string) => `/@${username}/likes`,
    }
};
