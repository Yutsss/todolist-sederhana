import db from "../config/db";

export class SessionRepository {
  static async create(userId: number, refreshToken: string, userAgent: string, expiry: number) {
    return db.session.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
        user_agent: userAgent,
        expiry: expiry
      }
    });
  }

  static async findByRefreshToken(refreshToken: string) {
    return db.session.findUnique({
      where: {
        refreshToken: refreshToken
      }
    });
  }

  static async deleteByRefreshToken(refreshToken: string) {
    return db.session.delete({
      where: {
        refreshToken: refreshToken
      }
    });
  }

  static async deleteExpiredSessions() {
    const now = Math.floor(Date.now() / 1000);

    return db.session.deleteMany({
      where: {
        expiry: {
          lte: now
        }
      }
    });
  }
}