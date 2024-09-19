import db from "../config/db";

export class CardRepository{

  static async create(title: string, userId: number) {
    return db.card.create({
      data: {
        title: title,
        userId: userId
      }
    });
  }

  static async findById(id: number) {
    return db.card.findUnique({
      where: {
        id: id
      }
    });
  }

  static async findByUserId(userId: number) {
    return db.card.findMany({
      where: {
        userId: userId
      },
      include: {
        Task: true
      }
    });
  }

  static async findByIdAndUpdate(id: number, title: string) {
    return db.card.update({
      where: {
        id: id
      },
      data: {
        title: title
      }
    });
  }

  static async findByIdAndDelete(id: number) {
    return db.card.delete({
      where: {
        id: id
      }
    });
  }
}