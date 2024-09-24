import { Router } from "express";
import { UserController } from "../controller/UserController";
import { GoogleAuthMiddleware } from "../middleware/GoogleAuthMiddleware";

const publicRouter = Router();

publicRouter.post("/users", UserController.register);
publicRouter.post("/users/login", UserController.login);
publicRouter.post("/users/auth/google", GoogleAuthMiddleware.concern);
publicRouter.get("/users/auth/google/callback", GoogleAuthMiddleware.callback, UserController.loginWithGoogle);

export default publicRouter;