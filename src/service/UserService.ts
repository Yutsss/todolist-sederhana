import { CreateUserRequest, GetAllUsersResponse, GetUserResponse, UpdatePasswordGoogleUser, UpdateUserRequest, UpdateUserResponse } from "../model/UserModel";
import { AuthRequest, LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RefreshTokenPayload, TokenPayload } from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";
import { BlacklistedTokenRepository } from "../repository/BlacklistedTokenRepository";
import { SessionRepository } from "../repository/SessionRepository";
import { UserValidation } from "../validation/UserValidation";
import { SessionValidation } from "../validation/SessionValidation";
import { Validation } from "../utils/validation";
import { ResponseError } from "../error/ResponseError";
import bcrypt from "bcrypt";
import { JwtToken } from "../utils/jwtToken";
import { verifyOldPassword } from "../utils/verifyOldPassword";
import { extractTokenExpiry } from "../utils/extract-token-expiry";

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
    const data = Validation.validation(UserValidation.LOGIN, request.body);

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
      userId: user.id,
    };

    const token = JwtToken.generateToken(payload);

    const userAgent = request.user_agent;

    const refreshPayload: RefreshTokenPayload = {
      userId: user.id,
      userAgent: userAgent,
    };

    const refreshToken = JwtToken.generateRefreshToken(refreshPayload);
    const refreshExpiry = extractTokenExpiry(refreshToken);

    await SessionRepository.create(user.id, refreshToken, userAgent, refreshExpiry);

    return {
      accessToken: token,
      refreshToken: refreshToken,
    }
  }

  static async loginWithGoogle (request: AuthRequest): Promise<LoginResponse> {
    const userId = request.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const payload: TokenPayload = {
      userId: user.id,
    };

    const token = JwtToken.generateToken(payload);

    const userAgent = request.headers["user-agent"] as string;

    const refreshPayload: RefreshTokenPayload = {
      userId: user.id,
      userAgent: userAgent,
    };

    const refreshToken = JwtToken.generateRefreshToken(refreshPayload);
    const refreshExpiry = extractTokenExpiry(refreshToken);

    await SessionRepository.create(user.id, refreshToken, userAgent, refreshExpiry);

    return {
      accessToken: token,
      refreshToken: refreshToken,
    }
  }

  static async refreshAccessToken (request: RefreshRequest): Promise<RefreshResponse> {
    const data = Validation.validation(SessionValidation.REFRESH_TOKEN, request);

    const session = await SessionRepository.findByRefreshToken(data.refreshToken);

    if (!session) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const isSameUserAgent = session.user_agent === data.userAgent;

    if (!isSameUserAgent) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const payload: TokenPayload = {
      userId: session.userId,
    };

    const token = JwtToken.generateToken(payload);

    return {
      accessToken: token,
    }
  }

  static async updatePasswordForGoogleUser(auth: AuthRequest, request: UpdatePasswordGoogleUser): Promise<UpdateUserResponse> {
    const data = Validation.validation(UserValidation.UPDATE_PASSWORD_GOOGLE_USER, request);

    const userId = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if(!user || user.googleId === null) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    const updatedData = await UserRepository.findByIdAndUpdate(userId, { password: data.password });

    return {
      name: updatedData.name,
      email: updatedData.email,
    }
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

  static async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await UserRepository.all();

    return {
      users: users.map(user => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    };
  }


  static async updateUser(auth: AuthRequest, request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userId: number = auth.user?.id as number;
    const data = Validation.validation(UserValidation.UPDATE, request);

    if(!data.email && !data.name && !data.password) {
      throw new ResponseError(400, "At least one field must be updated");
    }

    if(data.password) {
      if(!data.oldPassword) {
        throw new ResponseError(400, "Old password is required");
      }

      const user = await UserRepository.findById(userId);
      const isMatch = await verifyOldPassword(data.oldPassword, user?.password as string);

      if (!isMatch) {
        throw new ResponseError(400, "Old password is incorrect");
      }

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

  static async logout(auth: AuthRequest, token: string, refreshToken: string) {
    const userId = auth.user?.id as number;
    const expiry = extractTokenExpiry(token);

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "Unauthorized!");
    }

    const session = await SessionRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new ResponseError(404, "Unauthorized!");
    }

    await SessionRepository.deleteByRefreshToken(refreshToken);

    return await BlacklistedTokenRepository.create(token, expiry)
  }
}