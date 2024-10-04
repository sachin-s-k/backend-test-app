import express, { Router } from "express";
import { UserRepo } from "../repositories/userRepository";
import { UserInteractor } from "../interactors/userInteractor";
import { UserController } from "../controllers/userController";

const userRouter: Router = express.Router();

const userRepository = new UserRepo();
const userInteractor = new UserInteractor(userRepository);
const userController = new UserController(userInteractor);

userRouter.post(
  "/signin",
  (userController.OnLogin as any).bind(userController)
);
userRouter.post(
  "/signup",
  (userController.OnSignUp as any).bind(userController)
);

export default userRouter;
