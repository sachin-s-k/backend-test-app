import express, { Router } from "express";
import { RegisterRepository } from "../repositories/registerRepo";
import { RegisterController } from "../controllers/regitsterController";
import { RegisterInteractor } from "../interactors/registerInteractor";
import { body } from "express-validator";
const registerRouter: Router = express.Router();

const registerRepository = new RegisterRepository();
const registerInteractor = new RegisterInteractor(registerRepository);
const registerController = new RegisterController(registerInteractor);

registerRouter.post(
  "/:eventId",
  (registerController.OnRegister as any).bind(registerController)
);
registerRouter.get(
  "/institute/",
  (registerController.OnGetInstitute as any).bind(registerController)
);

registerRouter.post(
  "/:eventId/verify-number",
  [
    body("mobileNumber")
      .isLength({ min: 10, max: 10 }) // Check that the length is exactly 10 digits
      .withMessage("Mobile number must be exactly 10 digits.")
      .isNumeric() // Ensure that it only contains numeric values
      .withMessage("Mobile number must only contain numeric characters."),
  ],
  (registerController.OnVerifyMobileNumber as any).bind(registerController)
);
registerRouter.post(
  "/:eventId/verify-otp",
  [
    body("otp")
      .isLength({ min: 6, max: 6 }) // Check that the length is exactly 10 digits
      .withMessage("OTP number must be exactly 6 digits.")
      .isNumeric() // Ensure that it only contains numeric values
      .withMessage("OTP number must only contain numeric characters."),
  ],
  (registerController.OnVerifyOtp as any).bind(registerController)
);

registerRouter.post(
  "/team-code",
  (registerController.OnFindTeamCode as any).bind(registerController)
);

export default registerRouter;
