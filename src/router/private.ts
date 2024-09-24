import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CardController } from "../controller/CardController";
import { TaskController } from "../controller/TaskController";
import { IsTokenBlacklisted } from "../middleware/IsTokenBlacklisted";

const privateRouter = Router();
privateRouter.use(IsTokenBlacklisted);
privateRouter.use(AuthMiddleware);

privateRouter.get("/users", UserController.get);
privateRouter.put("/users", UserController.update);
privateRouter.post("/users/logout", UserController.logout);
privateRouter.post("/cards", CardController.add);
privateRouter.get("/cards", CardController.getAll);
privateRouter.put("/cards/:cardId", CardController.update);
privateRouter.delete("/cards/:cardId", CardController.delete);
privateRouter.post("/cards/:cardId/tasks", TaskController.add);
privateRouter.put("/cards/:cardId/tasks/:taskId", TaskController.update);
privateRouter.delete("/cards/:cardId/tasks/:taskId", TaskController.delete);


export default privateRouter;