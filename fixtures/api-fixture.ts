import { test as baseTest, request } from "../core/fixture/base-fixture";
import { RestClient } from "../core/api/rest-client";
import { UserService } from "../services/user-service";
import { BASE_API_URL } from "../constants/endpoint-constants";
import { USER_DATA } from "../data/user-data";


export type APIFixtureType = {
    restClient: RestClient;
    userService: UserService;
};
type ExtendParams = Parameters<typeof baseTest.extend<APIFixtureType>>;
const token = USER_DATA.valid_user_01.keyAccessToken!;
console.log('Token in USER_DATA:', USER_DATA.valid_user_01.keyAccessToken);

export const apiFixture: ExtendParams[0] = {
    restClient: async ({ }, use) => {
        const apiContext = await request.newContext({
            baseURL: BASE_API_URL,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        const client = new RestClient(apiContext);
        await use(client);
        await client.disposeClient();
    },

    userService: async ({ restClient }, use) => {
        const service = new UserService(restClient, token);
        await use(service);
    }
};

export const testAPI = baseTest.extend<APIFixtureType>(apiFixture);
export const expectAPI = baseTest.expect;