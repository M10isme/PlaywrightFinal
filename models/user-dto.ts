export interface UserLinks {
    self: string | null;
    html: string | null;
    photos: string | null;
    likes: string | null;
    portfolio: string | null;
}

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface UserPreviewDTO {
    id: string;
    username: string;
    name: string;
    portfolioUrl: string;
    bio: string;
    location: string;
    totalLikes: number;
    totalPhotos: number;
    totalCollections: number;
    instagramUsername: string;
    twitterUsername: string;
    profileImage: ProfileImage;
    links: UserLinks;
}


