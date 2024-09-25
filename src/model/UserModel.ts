export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface GetUserResponse {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdatePasswordGoogleUser {
  password: string;
}

export interface UpdateUserResponse {
  name: string;
  email: string;
}

