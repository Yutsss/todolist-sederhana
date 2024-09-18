import { CreateUserRequest } from "../model/UserModel";
import { UserValidation } from "../validation/UserValidation";
import { Validation } from "../utils/validation";
import { UserRepository } from "../repository/UserRepository";
import { ResponseError } from "../error/ResponseError";
import bcrypt from "bcrypt";
import { JwtToken } from "../utils/jwtToken";
import { LoginRequest, LoginResponse, TokenPayload } from "../model/AuthModel";

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

}