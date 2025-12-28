import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../configs/.env') });

export const USER_DATA = {
    valid_user_01: {
        fullname: process.env.UNSPLASH_ACCOUNT_FULLNAME,
        email: process.env.UNSPLASH_ACCOUNT_EMAIL,
        password: process.env.UNSPLASH_ACCOUNT_PASSWORD,
        keyAccessToken: process.env.UNSPLASH_ACCESS_TOKEN
    }
};