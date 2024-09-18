import jwt from 'jsonwebtoken';
import { TokenPayload } from '../model/AuthModel';

export class JwtToken {

    static generateToken(payload: TokenPayload): string {
      const secret = process.env.JWT_SECRET as string;
      return jwt.sign(payload, secret, { expiresIn: '1h' });
    }

}