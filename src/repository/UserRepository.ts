import db from "../config/db";

export class UserRepository {
  static async create(email: string, hashedPassword: string, name: string) {
    return db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name
      }
    });
  }

  static async findByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email: email
      }
    });
  }

  static async findById(id: number) {
    return db.user.findUnique({
      where: {
        id: id
      }
    });
  }

  static async findByIdAndUpdate(id: number, data: any) {
    return db.user.update({
      where: {
        id: id
      },
      data: data
    });
  }
}