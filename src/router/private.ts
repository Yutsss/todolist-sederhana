import { Router } from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CardController } from "../controller/CardController";
import { TaskController } from "../controller/TaskController";
import { IsTokenBlacklisted } from "../middleware/IsTokenBlacklisted";
import { RoleMiddleware } from "../middleware/RoleMIddleware";
import { toRequestHandler } from "../utils/middleware-parsing";

const privateRouter = Router();
privateRouter.use(IsTokenBlacklisted);
privateRouter.use(AuthMiddleware);

privateRouter.get("/users", toRequestHandler(RoleMiddleware(["USER", "ADMIN"])), UserController.get);
privateRouter.get("/users/all", toRequestHandler(RoleMiddleware(["ADMIN"])), UserController.getAll);
privateRouter.put("/users", toRequestHandler(RoleMiddleware(["USER", "ADMIN"])), UserController.update);
privateRouter.put("/users/google/update-password", toRequestHandler(RoleMiddleware(["USER"])), UserController.updateGoogleUserPassword);
privateRouter.post("/users/logout", toRequestHandler(RoleMiddleware(["USER", "ADMIN"])), UserController.logout);
privateRouter.post("/cards", toRequestHandler(RoleMiddleware(["USER"])), CardController.add);
privateRouter.get("/cards", toRequestHandler(RoleMiddleware(["USER"])), CardController.getAll);
privateRouter.put("/cards/:cardId", toRequestHandler(RoleMiddleware(["USER"])), CardController.update);
privateRouter.delete("/cards/:cardId", toRequestHandler(RoleMiddleware(["USER"])), CardController.delete);
privateRouter.post("/cards/:cardId/tasks", toRequestHandler(RoleMiddleware(["USER"])), TaskController.add);
privateRouter.put("/cards/:cardId/tasks/:taskId", toRequestHandler(RoleMiddleware(["USER"])), TaskController.update);
privateRouter.delete("/cards/:cardId/tasks/:taskId", toRequestHandler(RoleMiddleware(["USER"])), TaskController.delete);


export default privateRouter;