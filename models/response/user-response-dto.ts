import { UserPreviewDTO } from "../user-dto";

export interface UserResponseDTO extends UserPreviewDTO {
    firstName: string;
    lastName: string;
    email?: string;
    downloads: number;
    uploadsRemaining: number;
}