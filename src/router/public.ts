import { Router } from "express";
import {UserController} from "../controller/UserController";

const publicRouter = Router();

publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);

export default publicRouter;