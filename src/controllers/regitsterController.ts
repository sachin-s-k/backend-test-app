import { Request, Response } from "express";
import { IRegisterInteractor } from "../interfaces/IRegisterInteractor";
import { EmailService } from "../infrastructure/utils/nodeMailer";
import { json } from "stream/consumers";

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

    const { teamCode, participantType, memberOne, memberTwo, memberThree } =
      req.body;

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
          [memberOne, memberTwo, memberThree]
        );
      } else {
        registeredData = await this.registerInteractor.registerParticipant(
          teamCode,
          eventId,
          participantType,
          [memberOne]
        );
      }

      console.log(registeredData, "returnnn");
      const loginLink = "http://localhost:3000/signin/";
      // Send notification email to all team members
      await this.emailService.sendEventNotification(
        registeredData.teamMembers,
        registeredData.eventData.title,
        loginLink
      );
      return res.status(200).json({ message: "Event registered successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async OnVerifyMobileNumber(req: Request, res: Response) {
    console.log("enetrddd");

    const { mobileNumber } = req.body;
    const response = await this.registerInteractor.verifiyMobileNumber(
      mobileNumber
    );

    return res.status(200).json(response);
  }
  async OnVerifyOtp(req: Request, res: Response) {
    try {
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
}
