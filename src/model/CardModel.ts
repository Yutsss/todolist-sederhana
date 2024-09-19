import { Task } from "@prisma/client";

export interface Card {
  id: number;
  title: string;
  tasks: Task[];
}

export interface AddCardRequest {
  title: string;
}

export interface GetCardsResponse {
  cards: Card[];
}

export interface UpdateCardRequest {
  id: number;
  title: string;
}
