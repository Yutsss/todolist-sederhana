import { Router } from "express";
import {UserController} from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CardController } from "../controller/CardController";
import { TaskController } from "../controller/TaskController";

const privateRouter = Router();
privateRouter.use(AuthMiddleware);

privateRouter.get("/api/users", UserController.get);
privateRouter.put("/api/users", UserController.update);
privateRouter.post("/api/users/logout", UserController.logout);
privateRouter.post("/api/cards", CardController.add);
privateRouter.get("/api/cards", CardController.getAll);
privateRouter.put("/api/cards/:cardId", CardController.update);
privateRouter.delete("/api/cards/:cardId", CardController.delete);
privateRouter.post("/api/cards/:cardId/tasks", TaskController.add);
privateRouter.put("/api/cards/:cardId/tasks/:taskId", TaskController.update);
privateRouter.delete("/api/cards/:cardId/tasks/:taskId", TaskController.delete);


export default privateRouter;