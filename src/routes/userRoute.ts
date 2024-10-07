import express, { Router } from "express";
import { UserRepo } from "../repositories/userRepository";
import { UserInteractor } from "../interactors/userInteractor";
import { UserController } from "../controllers/userController";
import { body } from "express-validator";
const userRouter: Router = express.Router();

const userRepository = new UserRepo();
const userInteractor = new UserInteractor(userRepository);
const userController = new UserController(userInteractor);

userRouter.post(
  "/signin",
  [body("email").isEmail().normalizeEmail().withMessage("Invalid email")],
  (userController.OnLogin as any).bind(userController)
);
userRouter.post(
  "/signup",
  [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long")
      .trim()
      .escape(),
  ],
  (userController.OnSignUp as any).bind(userController)
);

export default userRouter;
