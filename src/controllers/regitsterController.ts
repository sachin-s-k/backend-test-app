import { Request, Response } from "express";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { EmailService } from "../infrastructure/utils/nodeMailer";
import { validationResult } from "express-validator";

export class RegisterController {
  private registerInteractor: IRegisterInteractor;
  private emailService: EmailService;

  constructor(registerInteractor: IRegisterInteractor) {
    this.registerInteractor = registerInteractor;
    this.emailService = new EmailService();
  }

  async OnRegister(req: Request, res: Response) {
    const eventId = req.params.eventId;
    console.log(eventId, "even");

    const { teamCode, participantType, members } = req.body;

    // const data: any = [memberOne, memberTwo, memberThree];
    // console.log(data);
    // console.log(data.length, "====>", participantType);

    try {
      let registeredData: any;
      if (participantType === "team") {
        console.log("teamm=======>");

        registeredData = await this.registerInteractor.registerParticipant(
          teamCode,
          eventId,
          participantType,
          members
        );
      } else {
        registeredData = await this.registerInteractor.registerParticipant(
          teamCode,
          eventId,
          participantType,
          members
        );
      }

      console.log(registeredData, "returnnn");
      const loginLink = "http://localhost:3000/signin/";
      // Send notification email to all team members
      await this.emailService.sendEventNotification(
        registeredData.teamMembers,
        registeredData.eventDataEntry.title,
        loginLink
      );
      return res.status(200).json({ message: "Event registered successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async OnVerifyMobileNumber(req: Request, res: Response) {
    console.log("enetrddd");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number provided.",
        errors: errors.array(),
      });
    }

    const { mobileNumber } = req.body;
    const response = await this.registerInteractor.verifiyMobileNumber(
      mobileNumber
    );

    return res.status(200).json(response);
  }
  async OnVerifyOtp(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP number provided.",
          errors: errors.array(),
        });
      }
      const { mobileNumber, otp } = req.body;
      const response = await this.registerInteractor.verifyOtp(
        mobileNumber,
        otp
      );
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async OnFindTeamCode(req: Request, res: Response) {
    try {
      const { teamCode } = req.body;
      const teamCodeData = await this.registerInteractor.checkTeamCode(
        teamCode
      );
      res.status(200).json(teamCodeData);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async OnGetInstitute(req: Request, res: Response) {
    const instituteData = await this.registerInteractor.getInstitute();
    return res.status(200).json(instituteData);
  }
}
