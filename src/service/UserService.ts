import { CreateUserRequest, GetUserResponse, UpdatePasswordGoogleUser, UpdateUserRequest, UpdateUserResponse } from "../model/UserModel";
import { UserValidation } from "../validation/UserValidation";
import { Validation } from "../utils/validation";
import { UserRepository } from "../repository/UserRepository";
import { ResponseError } from "../error/ResponseError";
import bcrypt from "bcrypt";
import { JwtToken } from "../utils/jwtToken";
import { AuthRequest, LoginRequest, LoginResponse, TokenPayload } from "../model/AuthModel";
import { BlacklistedTokenRepository } from "../repository/BlacklistedTokenRepository";

export class UserService {

  static async registerUser (request: CreateUserRequest) {
    const data = Validation.validation(UserValidation.REGISTER, request);

    const userExists = await UserRepository.findByEmail(data.email);

    if (userExists) {
      throw new ResponseError(409, "User already exists");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    return await UserRepository.create(data.email, data.password, data.name);
  }

  static async loginUser (request: LoginRequest): Promise<LoginResponse> {
    const data = Validation.validation(UserValidation.LOGIN, request);

    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new ResponseError(401, "Invalid email or password");
    }

    if (!user.password){
      throw new ResponseError(401, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new ResponseError(401, "Invalid email or password");
    }

    const payload: TokenPayload = {
      id: user.id,
    };

    const token = JwtToken.generateToken(payload);

    return {
      token: token,
    }
  }

  static async loginWithGoogle (request: AuthRequest): Promise<LoginResponse> {
    const userId = request.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const payload: TokenPayload = {
      id: user.id,
    };

    const token = JwtToken.generateToken(payload);

    return {
      token: token,
    }
  }

  static async updatePasswordForGoogleUser(auth: AuthRequest, request: UpdatePasswordGoogleUser) {
    const data = Validation.validation(UserValidation.UPDATE_PASSWORD_GOOGLE_USER, request);

    const userId = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if(!user || user.googleId === null) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    return await UserRepository.findByIdAndUpdate(userId, { password: data.password });
  }

  static async getUser(auth: AuthRequest): Promise<GetUserResponse> {
    const userId: number = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return {
      name: user.name,
      email: user.email,
    };
  }

  static async updateUser(auth: AuthRequest, request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userId: number = auth.user?.id as number;
    const data = Validation.validation(UserValidation.UPDATE, request);

    if(!data.email && !data.name && !data.password) {
      throw new ResponseError(400, "At least one field must be updated");
    }

    if(data.password) {
      const salt: number = parseInt(process.env.SALT_ROUNDS || "");
      data.password = await bcrypt.hash(data.password, salt);
    }

    const updatedUser = await UserRepository.findByIdAndUpdate(userId, data);

    if (!updatedUser) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return {
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  static async logout(auth: AuthRequest, token: string) {
    const userId = auth.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return await BlacklistedTokenRepository.create(token)
  }
}