import { Router } from "express";
import {UserController} from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const privateRouter = Router();
privateRouter.use(AuthMiddleware);

privateRouter.get("/api/users", UserController.get);
privateRouter.put("/api/users", UserController.update);
privateRouter.post("/api/users/logout", UserController.logout);

export default privateRouter;