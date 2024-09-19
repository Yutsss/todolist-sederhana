import { Router } from "express";
import {UserController} from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CardController } from "../controller/CardController";

const privateRouter = Router();
privateRouter.use(AuthMiddleware);

privateRouter.get("/api/users", UserController.get);
privateRouter.put("/api/users", UserController.update);
privateRouter.post("/api/users/logout", UserController.logout);
privateRouter.post("/api/card", CardController.add);
privateRouter.get("/api/card", CardController.getAll);
privateRouter.put("/api/card/:cardId", CardController.update);
privateRouter.delete("/api/card/:cardId", CardController.delete);

export default privateRouter;