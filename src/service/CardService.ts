import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";
import { AddCardRequest, DeleteCardRequest, GetCardsResponse, UpdateCardRequest } from "../model/CardModel";
import { CardRepository } from "../repository/CardRepository";
import { UserRepository } from "../repository/UserRepository";
import { Validation } from "../utils/validation";
import { CardValidation } from "../validation/CardValidation";

export class CardService {

  static async addCard(auth: AuthRequest, request: AddCardRequest) {
    const data = Validation.validation(CardValidation.ADD, request);

    const userId: number = auth.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return await CardRepository.create(data.title, userId);
  }

  static async getCards(auth: AuthRequest): Promise<GetCardsResponse>{

    const userId: number = auth.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const cards = await CardRepository.findByUserId(userId);

    return {
      cards: cards.map(card => {
        return {
          id: card.id,
          title: card.title,
          tasks: card.Task
        }
      })
    }
  }

  static async updateCard(auth: AuthRequest, request: UpdateCardRequest) {
    const data = Validation.validation(CardValidation.UPDATE, request);
    const userId: number = auth.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const card = await CardRepository.findById(data.id);

    if (!card) {
      throw new ResponseError(404, "Card not found");
    }

    if (card.userId !== userId) {
      throw new ResponseError(403, "Forbidden");
    }

    return await CardRepository.findByIdAndUpdate(data.id, data.title);
  }

  static async deleteCard(auth: AuthRequest, request: DeleteCardRequest) {
    const data = Validation.validation(CardValidation.DELETE, request);

    const userId: number = auth.user?.id as number;

    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const card = await CardRepository.findById(data.id);

    if (!card) {
      throw new ResponseError(404, "Card not found");
    }

    if (card.userId !== userId) {
      throw new ResponseError(403, "Forbidden");
    }

    return await CardRepository.findByIdAndDelete(data.id);
  }
}
