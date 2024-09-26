import db from "../config/db";

export class BlacklistedTokenRepository {
  static async create(token: string, expiry: number) {
    return db.blacklistedToken.create({
      data: {
        token: token,
        expiry: expiry
      }
    });
  }

  static async findByToken(token: string) {
    return db.blacklistedToken.findUnique({
      where: {
        token: token
      }
    });
  }

  static async deleteExpiredTokens() {
    const now = Math.floor(Date.now() / 1000);

    return db.blacklistedToken.deleteMany({
      where: {
        expiry: {
          lte: now
        }
      }
    });
  }
}