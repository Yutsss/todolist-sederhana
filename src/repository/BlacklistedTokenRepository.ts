import db from "../config/db";

export class BlacklistedTokenRepository {
  static async create(token: string) {
    return db.blacklistedToken.create({
      data: {
        token: token
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
}