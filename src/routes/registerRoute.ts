import express, { Router } from "express";
import { RegisterRepository } from "../repositories/registerRepo";
import { RegisterController } from "../controllers/regitsterController";
import { RegisterInteractor } from "../interactors/registerInteractor";
const registerRouter: Router = express.Router();

const registerRepository = new RegisterRepository();
const registerInteractor = new RegisterInteractor(registerRepository);
const registerController = new RegisterController(registerInteractor);

registerRouter.post(
  "/:eventId",
  (registerController.OnRegister as any).bind(registerController)
);

registerRouter.post(
  "/:eventId/verify-number",
  (registerController.OnVerifyMobileNumber as any).bind(registerController)
);
registerRouter.post(
  "/:eventId/verify-otp",
  (registerController.OnVerifyOtp as any).bind(registerController)
);

registerRouter.post(
  "/team-code",
  (registerController.OnFindTeamCode as any).bind(registerController)
);

export default registerRouter;
