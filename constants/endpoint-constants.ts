export const BASE_URL: string = "https://unsplash.com";
export const BASE_API_URL: string = "https://api.unsplash.com";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/login",
    },
    USER: {
        CURRENT: "/me",
        PROFILE: (username: string) => `/@${username}`,
    }
};

export const COLLECTION_CONSTANTS = {
    MY_FIRST_COLLECTION: "My first collection",
    NUMBER_OF_PHOTOS_TO_ADD: 3
};
