import db from "../config/db";

// model Task {
//   id      Int       @id @default(autoincrement())
//   title   String    @db.VarChar(100)
//   cardId  Int
//   card    Card      @relation(fields: [cardId], references: [id], onDelete: Cascade)
//   dueDate DateTime? @db.DateTime
//   done    Boolean   @default(false)

//   @@map("tasks")
// }

export class TaskRepository {
  
  static async create(title: string, cardId: number) {
    return db.task.create({
      data: {
        title: title,
        cardId: cardId
      }
    });
  }

  static async findById(id: number) {
    return db.task.findUnique({
      where: {
        id: id
      }
    });
  }

  static async findByIdAndUpdate(id: number, data: Partial<{ title: string, done: boolean, dueDate: Date }>) {
    return db.task.update({
      where: {
        id: id
      },
      data: data
    });

  }

  static async findByIdAndDelete(id: number) {
    return db.task.delete({
      where: {
        id: id
      }
    });
  }

}