import { API_ENDPOINTS } from '../constants/endpoint-constants';
import { RestClient } from '../core/api/rest-client';
import { UserResponseDTO } from '../models/response/user-response-dto';
import { APIRequestBuilder } from '../core/api/api-request';
import { UpdateUserProfileDTO } from '../models/request/user-request-dto';

export class UserService {
    private restClient: RestClient;
    private token: string;

    constructor(restClient: RestClient, token: string) {
        this.restClient = restClient;
        this.token = token;
    }

    async getCurrentUserName(): Promise<string> {
        const request = this.restClient.requestBuilder()
            .addAuthorizationHeader("BEARER", { token: this.token })
            .addJsonHeaders()
            .build();

        const response = await this.restClient.get(API_ENDPOINTS.USER.CURRENT, {
            headers: request.header as Record<string, string>,
        });

        const json = await response.json();
        return json.username;
    }

    async updateUsername(data: UpdateUserProfileDTO): Promise<UserResponseDTO> {
        const request = new APIRequestBuilder()
            .addAuthorizationHeader("BEARER", { token: this.token })
            .addJsonHeaders()
            .addData(data)
            .build();

        const response = await this.restClient.put(API_ENDPOINTS.USER.CURRENT, {
            data: request.data,
            headers: request.header as Record<string, string>,
        });

        return await response.json() as UserResponseDTO;
    }
}
