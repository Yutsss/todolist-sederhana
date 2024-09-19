import { Request, Response } from "express";
import { AuthRequest } from "../model/AuthModel";
import { CardService } from "../service/CardService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export class CardController {

  static async add(req: Request, res: Response) {
    try{
      const request = req as AuthRequest;
      const data = req.body;
      await CardService.addCard(request, data);
      successResponse(res, 201, "Card added successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    try{
      const request = req as AuthRequest;
      const data = await CardService.getCards(request);
      successResponse(res, 200, "Cards fetched successfully", data);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

  static async update(req: Request, res: Response) {
    try{
      const request = req as AuthRequest;
      const cardId = parseInt(req.params.cardId);
      const data = {
        id: cardId,
        title: req.body.title
      }
      await CardService.updateCard(request, data);
      successResponse(res, 200, "Card updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try{
      const request = req as AuthRequest;
      const cardId = parseInt(req.params.cardId);
      await CardService.deleteCard(request, cardId);
      successResponse(res, 200, "Card deleted successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

}