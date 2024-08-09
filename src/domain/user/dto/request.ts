// src/domain/user/dto/request.ts

export interface UpdateUserRequest {
    id: number;
    name?: string;
    email?: string;
    status?: string;
}
