export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface GetUserResponse {
  name: string;
  email: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
}

export interface UpdateUserResponse {
  name: string;
  email: string;
}

